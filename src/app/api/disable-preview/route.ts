import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { DRAFT_KEY_COOKIE } from '@/libs/draft';

export async function GET() {
  const draft = await draftMode();
  draft.disable();
  (await cookies()).delete(DRAFT_KEY_COOKIE);
  redirect('/');
}
