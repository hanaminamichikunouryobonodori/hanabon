/**
 * 文字列にHTMLタグが含まれているか判定します。
 * @param str - 判定する文字列
 * @returns {boolean} - HTMLタグが含まれていればtrue
 */
export const containsHtml = (str: string): boolean => {
  if (!str) return false;
  // <tag> や <tag/> のような形式のHTMLタグにマッチする正規表現
  const htmlTagRegex = /<[a-z][\s\S]*>/i;
  return htmlTagRegex.test(str);
};
