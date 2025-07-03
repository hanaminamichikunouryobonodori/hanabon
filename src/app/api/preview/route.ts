import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const slug = params.get('slug');
  const draftKey = params.get('draftKey');

  if (!slug || !draftKey) {
    return new NextResponse('Invalid slug or draftKey', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`/news/${slug}?draftKey=${draftKey}`);
}
