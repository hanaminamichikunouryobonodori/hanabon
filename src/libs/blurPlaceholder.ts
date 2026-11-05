/**
 * microCMS（imgix）の画像から、HTML に埋め込むためのごく小さいぼかし用画像（data URI）を作る。
 * next/image の placeholder='blur' 用。本物の画像が届くまで背景が透けて見えるのを防ぐ。
 * サーバー側（ビルド時・再生成時）でだけ実行する。失敗したら undefined を返す。
 */
export const getBlurDataUrl = async (src: string): Promise<string | undefined> => {
  try {
    const url = new URL(src);
    url.searchParams.set('w', '24');
    url.searchParams.set('q', '40');
    url.searchParams.set('fm', 'webp');
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return undefined;
    const base64 = Buffer.from(await res.arrayBuffer()).toString('base64');
    return `data:image/webp;base64,${base64}`;
  } catch {
    return undefined;
  }
};
