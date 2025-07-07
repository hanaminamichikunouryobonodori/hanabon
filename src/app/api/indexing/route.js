// app/api/indexing/route.js (最終手段バージョン)

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

// URLを構築するロジック（ご自身のサイト構成に合わせて変更してください）
function constructUrl(microcmsPayload) {
  const apiName = microcmsPayload.api;
  const contentId = microcmsPayload.id;
  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN; // あなたのドメインに変更

  switch (apiName) {
    case 'news':
      return `${YOUR_DOMAIN}/news/${contentId}`;
    default:
      return null;
  }
}

export async function POST(request) {
  // microCMSの署名検証
  const signature = request.headers.get('x-microcms-signature');
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: 'Signature or secret is missing.' }, { status: 401 });
  }
  const body = await request.text();
  const expectedSignature = createHmac('sha256', secret).update(body).digest('hex');
  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const url = constructUrl(payload);
  if (!url) {
    return NextResponse.json({ message: 'URL construction skipped.' }, { status: 200 });
  }
  const type = payload.type === 'delete' ? 'URL_DELETED' : 'URL_UPDATED';

  try {
    // 環境変数からJSON文字列を読み込み、パースする
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    // JSONオブジェクトから直接JWTクライアントを生成
    const jwtClient = google.auth.fromJSON(credentials);
    jwtClient.scopes = ['https://www.googleapis.com/auth/indexing'];

    const indexing = google.indexing({ version: 'v3', auth: jwtClient });

    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    console.log(`✅ Indexing API request sent successfully for URL: ${url}`);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('❌ Indexing API error:', error.message);
    // エラーの原因を特定しやすくするため、詳細な情報を返す
    if (error.message.includes('invalid_grant')) {
      console.error(
        'Authentication failed: The private key or client email may be incorrect, or the service account may not have permission.'
      );
    }
    return NextResponse.json(
      { error: 'Failed to request indexing.', details: error.message },
      { status: 500 }
    );
  }
}
