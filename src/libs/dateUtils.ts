/**
 * 指定された日付から現在までの経過年数を計算します。
 * @param dateString - 判定対象の日付文字列
 * @returns 経過した年数（整数）
 */
export function getElapsedYears(dateString: string): number {
  if (!dateString) return 0;

  const publicationDate = new Date(dateString);
  const currentDate = new Date();

  const diffMilliseconds = currentDate.getTime() - publicationDate.getTime();
  if (diffMilliseconds < 0) return 0;

  const years = diffMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(years);
}
