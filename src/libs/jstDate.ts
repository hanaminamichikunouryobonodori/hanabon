/**
 * 日本時間（Asia/Tokyo）基準で日付を扱うためのユーティリティ。
 *
 * Vercel のサーバーは UTC で動くため、Date#getDate() などをそのまま使うと
 * サーバーとブラウザ（日本時間）で日付がずれ、ハイドレーションの不一致が起きる。
 */
const JST = 'Asia/Tokyo';

const partsFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: JST,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
});

const eraFormatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
  timeZone: JST,
  era: 'long',
  year: 'numeric',
});

export type JstDateParts = {
  year: number;
  month: number;
  day: number;
  /** 日〜土 */
  weekday: string;
  /** YYYY-MM-DD（比較用） */
  ymd: string;
};

export const toJstParts = (date: Date): JstDateParts => {
  const parts = Object.fromEntries(
    partsFormatter.formatToParts(date).map((p) => [p.type, p.value])
  ) as Record<string, string>;
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  return {
    year,
    month,
    day,
    weekday: parts.weekday,
    ymd: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  };
};

/** 例: 「令和8」 */
export const formatJstEraYear = (date: Date) => eraFormatter.format(date).split('年')[0];
