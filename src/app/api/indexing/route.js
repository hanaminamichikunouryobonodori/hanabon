// app/api/indexing/route.js

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

// URLを構築するロジック（ご自身のサイト構成に合わせて変更してください）
function constructUrl(microcmsPayload) {
  const apiName = microcmsPayload.api; // 'blog', 'news' など
  const contentId = microcmsPayload.id;

  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN; // あなたのドメインに変更

  switch (apiName) {
    case 'news':
      return `${YOUR_DOMAIN}/news/${contentId}`;
    // 他のAPIがあればここに追加
    default:
      return null;
  }
}

export async function POST(request) {
  // 1. 署名の検証
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

  // 2. Webhookペイロードの解析とURL構築
  const payload = JSON.parse(body);
  const url = constructUrl(payload);
  if (!url) {
    return NextResponse.json(
      { message: 'URL construction skipped for this API.' },
      { status: 200 }
    );
  }
  const type = payload.type === 'delete' ? 'URL_DELETED' : 'URL_UPDATED';

  // 3. Google Indexing APIへのリクエスト
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    // Base64エンコードされた秘密鍵をデコードして元に戻す
    const privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY, 'base64').toString('utf-8');

    const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, [
      'https://www.googleapis.com/auth/indexing',
    ]);
    const indexing = google.indexing({ version: 'v3', auth: jwtClient });

    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    console.log(`Indexing API request sent for URL: ${url}, Type: ${type}`);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Indexing API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to request indexing.', details: error.message },
      { status: 500 }
    );
  }
}
