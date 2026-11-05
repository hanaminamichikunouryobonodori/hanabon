import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/libs/client';
import { DRAFT_KEY_COOKIE } from '@/libs/draft';
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

  // draftKey は Cookie で渡す（searchParams を使うとページが常に動的描画になるため）
  (await cookies()).set(DRAFT_KEY_COOKIE, draftKey, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  redirect(`${redirectPath}${anchor}`);
}
