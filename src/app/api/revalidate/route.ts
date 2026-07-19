import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { MicrocmsWebhookPayload, verifyMicrocmsSignature } from '@/libs/microcmsWebhook';

const revalidatePathsFor = (payload: MicrocmsWebhookPayload) => {
  switch (payload.api) {
    case 'news':
      return [`/news/${payload.id}`, '/news', '/'];
    case 'pages':
      return ['/', '/privacy'];
    case 'theme':
      return ['/'];
    default:
      return [];
  }
};

export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-microcms-signature');
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  const body = await request.text();

  if (!verifyMicrocmsSignature(signature, secret, body)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  const payload: MicrocmsWebhookPayload = JSON.parse(body);
  const paths = revalidatePathsFor(payload);

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
