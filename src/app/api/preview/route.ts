import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/libs/client';
import { homepage } from '@/types/microCMS/homepage-types';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const slug = params.get('slug');
  const draftKey = params.get('draftKey');
  const type = params.get('type');
  console.log('routeDraftKey: ', draftKey);

  if (!slug || !draftKey || !type) {
    return new NextResponse('Invalid request', { status: 401 });
  }

  let redirectPath = '/';
  let anchor = '';

  if (type === 'pages') {
    try {
      const homepageData = await client.getObject<homepage<'get'>>({
        endpoint: 'homepage',
        queries: { draftKey },
      });

      for (const key in homepageData) {
        const reference = homepageData[key as keyof typeof homepageData];
        if (
          reference &&
          typeof reference === 'object' &&
          'id' in reference &&
          reference.id === slug
        ) {
          anchor = `#${key}`;
          break;
        }
      }
    } catch (error) {
      console.error('Preview API error:', error);
      return new NextResponse('Could not fetch homepage data for preview', { status: 500 });
    }
  } else if (type === 'news' || type === 'manuals') {
    redirectPath = `/${type}/${slug}`;
  } else {
    return new NextResponse('Invalid content type', { status: 400 });
  }

  // Draft Modeを有効にする
  const draft = await draftMode();
  draft.enable();

  // ★ 正しい順序 (パス + クエリ + アンカー) でURLを組み立ててリダイレクト
  redirect(`${redirectPath}?draftKey=${draftKey}${anchor}`);
}
