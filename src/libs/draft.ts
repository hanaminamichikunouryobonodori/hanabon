import { cookies, draftMode } from 'next/headers';

export const DRAFT_KEY_COOKIE = 'microcms_draft_key';

/**
 * プレビュー（Draft Mode）中のときだけ、Cookie に保存した microCMS の draftKey を返す。
 *
 * searchParams から読むとページが常に動的描画になってしまうため、Cookie 経由にしている。
 * Draft Mode でないときは cookies() を呼ばないので、ページは静的（ISR）のまま配信される。
 */
export const getDraftKey = async (): Promise<string | undefined> => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return undefined;
  return (await cookies()).get(DRAFT_KEY_COOKIE)?.value;
};
