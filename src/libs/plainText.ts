import { convert } from 'html-to-text';

import { NewsData, PageData } from '@/types';

/**
 * 記事のcontentオブジェクトからテキストを生成します。
 * @param content - 記事のcontentオブジェクト
 * @returns maxLengthがあればその長さまでの要約テキスト（末尾に...が付与されます）
 */
export function generatePlainText(content: NewsData | PageData, maxLength?: number): string {
  const textBlocks = content.content
    .map((block) => {
      if (block.fieldId === 'rich_text' && block.rich_text) return block.rich_text;
      if (block.fieldId === 'heading' && block.heading_content) return block.heading_content;
      if (block.fieldId === 'boxes' && block.box_content) return block.box_content;
      return '';
    })
    .filter((text) => text)
    .join(' ');

  if (textBlocks) {
    const plainText = convert(textBlocks, {
      wordwrap: false,
      selectors: [
        { selector: 'a', options: { ignoreHref: true } },
        { selector: 'img', format: 'skip' },
      ],
    });
    if (maxLength && maxLength < plainText.length) {
      return plainText.substring(0, maxLength).replace(/\s+$/, '') + '...';
    }
    return plainText;
  }

  // テキストブロックがない場合は記事タイトルを返す
  return content.title;
}
