import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const slug = params.get('slug');
  const draftKey = params.get('draftKey');
  const type = params.get('type'); // 'news' または 'manuals'

  if (!slug || !draftKey || !type) {
    return new NextResponse('Invalid request: slug, draftKey, and type are required', {
      status: 401,
    });
  }

  if (type !== 'news' && type !== 'manuals') {
    return new NextResponse(`Preview not supported for type: ${type}`, {
      status: 400,
    });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectPath = `/${type}/${slug}`;

  redirect(`${redirectPath}?draftKey=${draftKey}`);
}
