import React, { JSX, useContext } from 'react';

import Image from 'next/image';

import ImageCarousel from '@/components/ui/ImageCarousel';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import SafeHtmlRenderer from '@/components/ui/SafeHtmlRenderer';
import { LightboxContext } from '@/contexts/LightboxContext';
import { news } from '@/types/microCMS/news-types';
import { pages } from '@/types/microCMS/pages-types';

type PagesContentBlock = NonNullable<pages<'get'>['content']>[number];
type NewsContentBlock = NonNullable<news<'get'>['content']>[number];
type InferredMediaType = NonNullable<news<'get'>['featuredImage']>;
type ImageContentType = InferredMediaType & { alt?: string };

type Props = {
  content: PagesContentBlock[] | NewsContentBlock[];
  id?: string;
  className?: string;
};

const sizeMap = {
  極小: 'sm',
  小: 'md',
  中: 'lg',
  大: 'xl',
  特大: 'xxl',
} as const;

type JapaneseSize = keyof typeof sizeMap;

const ContentRenderer = ({ content, id, className }: Props) => {
  const { openLightbox } = useContext(LightboxContext);

  if (!content) {
    return null;
  }
  const Wrapper = className ? 'div' : React.Fragment;
  const wrapperProps = className ? { className: className } : {};

  return (
    <Wrapper {...wrapperProps}>
      {content.map((block, index) => {
        const key = `${block.fieldId}-${index}`;

        switch (block.fieldId) {
          // 1. リッチテキスト
          case 'rich_text': {
            const alignClass =
              block.align?.[0] === '中央揃え'
                ? 'u-flex-center-column'
                : block.align?.[0] === '右寄せ'
                  ? 'u-flex-right-column'
                  : 'u-flex-left-column';

            return (
              <React.Fragment key={key}>
                <SafeHtmlRenderer
                  className={alignClass}
                  htmlContent={block.rich_text}
                  id={block.content_id}
                />
              </React.Fragment>
            );
          }

          // 2. 画像
          case 'image': {
            if (!block.image_content) return null;
            const imageContent = block.image_content as ImageContentType;
            return (
              <figure key={key}>
                <button
                  aria-label='画像を拡大表示'
                  className='c-reset-button'
                  onClick={() => openLightbox([{ src: imageContent.url }])}
                >
                  <Image
                    alt={imageContent.alt || ''}
                    className='u-responsive-image u-image-rounded-md'
                    height={imageContent.height}
                    onClick={() => openLightbox([{ src: imageContent.url }])}
                    src={imageContent.url}
                    width={imageContent.width}
                  />
                </button>
              </figure>
            );
          }

          // 3. ギャラリー
          case 'gallery': {
            const gallery = block.gallery_content;
            if (gallery && gallery.length > 0) {
              return (
                <React.Fragment key={key}>
                  <ImageCarousel aspect={block.gallery_aspect?.[0]} photos={gallery} />
                </React.Fragment>
              );
            }
            return <p>現在、表示できる写真がありません。</p>;
          }

          // 4. 囲み枠ボックス
          case 'boxes': {
            // box_classの値に応じてCSSクラスを決定
            const boxClass =
              block.box_class?.[0] === '付箋ボックス'
                ? 'c-sticky-box'
                : block.box_class?.[0] === 'インフォ'
                  ? 'c-info-box'
                  : block.box_class?.[0] === 'Q&A'
                    ? 'c-question-box'
                    : block.box_class?.[0] === '注意・警告'
                      ? 'c-alert-box'
                      : 'c-simple-box'; // デフォルトはシンプルボックス
            return (
              <React.Fragment key={key}>
                <SafeHtmlRenderer className={boxClass} htmlContent={block.box_content} />
              </React.Fragment>
            );
          }

          // 5. 2カラムブロック【再帰ポイント】
          case 'two_column_block': {
            const isSponsorshipBlock = id === 'sponsorship';
            return (
              <div className='l-grid l-grid--half' key={key}>
                <>
                  <ContentRenderer
                    className={isSponsorshipBlock ? 'c-filled-block is-primary' : ''}
                    content={block.column_left}
                  />
                </>
                <>
                  <ContentRenderer
                    className={isSponsorshipBlock ? 'c-filled-block is-secondary' : ''}
                    content={block.column_right}
                  />
                </>
              </div>
            );
          }

          // 6. グリッドコンテンツ【再帰ポイント】
          case 'grid_container': {
            if (!block.grid_content) return null;
            const gridTypeMap = {
              'auto-fit': 'grid-auto-fit',
              'auto-fill': 'grid-auto-fill',
              thirds: 'thirds',
              fourth: 'fourths',
              '2-8': '2-8',
              '8-2': '8-2',
              '3-7': '3-7',
              '7-3': '7-3',
            };

            const typeFromCMS = block.grid_type?.[0] || 'auto-fit';
            const modifierSuffix = gridTypeMap[typeFromCMS] || 'grid-auto-fit';
            const gridClass = `l-grid--${modifierSuffix}`;

            return (
              <div className={`l-grid ${gridClass}`} key={key}>
                <ContentRenderer content={block.grid_content} />
              </div>
            );
          }

          // 7. 見出し
          case 'heading': {
            let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;
            if (block.heading_level && block.heading_level.length > 0) {
              const levelAsNumber = parseInt(block.heading_level[0], 10);
              if (!isNaN(levelAsNumber) && levelAsNumber >= 1 && levelAsNumber <= 6) {
                headingLevel = levelAsNumber as 1 | 2 | 3 | 4 | 5 | 6;
              }
            }
            const isMinchoHeading = block.heading_id === 'minchoHeading';
            if (isMinchoHeading) {
              return (
                <MinchoHeadingComponent key={key} level={headingLevel}>
                  {block.heading_content}
                </MinchoHeadingComponent>
              );
            } else {
              const HeadingComponent = `h${headingLevel}` as keyof JSX.IntrinsicElements;
              return <HeadingComponent key={key}>{block.heading_content}</HeadingComponent>;
            }
          }

          // 8. 余白
          case 'spacer': {
            const japaneseSize = (block.space_height?.[0] || '中') as JapaneseSize;
            const sizeKey = sizeMap[japaneseSize] || 'md';
            const spacerClass = `mt-${sizeKey}`;

            return <div aria-hidden='true' className={spacerClass} key={key} />;
          }

          default:
            return null;
        }
      })}
    </Wrapper>
  );
};

export default ContentRenderer;
