// app/api/indexing/route.js

import { createHmac } from 'crypto';

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

function constructUrl(microcmsPayload) {
  const apiName = microcmsPayload.api;
  const contentId = microcmsPayload.id;

  const YOUR_DOMAIN = process.env.DOMAIN;

  switch (apiName) {
    case 'news': // microCMSのAPI名が 'news' の場合
      return `${YOUR_DOMAIN}/news/${contentId}`;
    // 他のAPIがあればここに追加
    default:
      return null;
  }
}

export async function POST(request) {
  console.log('--- Start Debugging Environment Variables ---');
  console.log('Type of GOOGLE_CLIENT_EMAIL:', typeof process.env.GOOGLE_CLIENT_EMAIL);
  console.log('Is GOOGLE_CLIENT_EMAIL present?', !!process.env.GOOGLE_CLIENT_EMAIL);

  console.log('Type of GOOGLE_PRIVATE_KEY:', typeof process.env.GOOGLE_PRIVATE_KEY);
  console.log('Is GOOGLE_PRIVATE_KEY present?', !!process.env.GOOGLE_PRIVATE_KEY);
  console.log('--- End Debugging ---');
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

  // 2. Webhookペイロードの解析
  const payload = JSON.parse(body);
  const url = constructUrl(payload);
  if (!url) {
    return NextResponse.json(
      { message: 'URL construction skipped for this API.' },
      { status: 200 }
    );
  }

  // "公開" または "更新" の場合は 'URL_UPDATED'、"削除" の場合は 'URL_DELETED'
  const type = payload.type === 'delete' ? 'URL_DELETED' : 'URL_UPDATED';

  // 3. Google Indexing APIへのリクエスト
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

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
