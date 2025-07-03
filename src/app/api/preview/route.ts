import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/libs/client';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const slug = params.get('slug');
  const draftKey = params.get('draftKey');
  const secret = params.get('secret');

  // Secretがない、または一致しない場合はエラー
  if (secret !== process.env.MICROCMS_PREVIEW_SECRET || !slug) {
    return new NextResponse('Invalid token', { status: 401 });
  }

  // 下書き記事の存在確認（任意だが推奨）
  const post = await client.get({
    endpoint: 'news',
    contentId: slug,
    queries: {
      ...(draftKey && { draftKey: draftKey }),
    },
  });
  if (!post) {
    return new NextResponse('Invalid slug', { status: 401 });
  }
  const draft = await draftMode();
  // Draft Modeを有効にするCookieを発行
  draft.enable();

  // 記事ページにリダイレクト
  // draftKeyをクエリとして渡すことで、ページ側で下書きデータを取得できる
  redirect(`/news/${slug}?draftKey=${draftKey}`);
}
