import { news } from '@/types/microCMS/news-types';
import { pages } from '@/types/microCMS/pages-types';

type PagesContentBlock = NonNullable<pages<'get'>['content']>[number];
type NewsContentBlock = NonNullable<news<'get'>['content']>[number];
type ContentBlock = PagesContentBlock | NewsContentBlock;
export type GroupedOverlappingBox = {
  fieldId: 'grouped_overlapping_box';
  items: Extract<PagesContentBlock, { fieldId: 'overlapping_box' }>[];
};

/**
 * content配列を受け取り、連続する'overlapping_box'ブロックを1つのグループにまとめる関数
 * @param content - microCMSから取得したcontentの配列
 * @returns グループ化処理後のブロック配列
 */
export const groupConsecutiveBlocks = (
  content: ContentBlock[]
): (ContentBlock | GroupedOverlappingBox)[] => {
  if (!content) return [];

  return content.reduce<(ContentBlock | GroupedOverlappingBox)[]>((acc, currentBlock) => {
    const lastItem = acc[acc.length - 1];

    if (currentBlock.fieldId === 'overlapping_box') {
      if (lastItem?.fieldId === 'grouped_overlapping_box') {
        lastItem.items.push(currentBlock);
      } else {
        acc.push({
          fieldId: 'grouped_overlapping_box',
          items: [currentBlock],
        });
      }
    } else {
      acc.push(currentBlock);
    }
    return acc;
  }, []);
};
