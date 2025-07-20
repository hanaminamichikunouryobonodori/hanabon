import React, { JSX, useContext } from 'react';

import Image from 'next/image';

import CardComponent from '@/components/ui/CardComponent';
import ImageCarousel from '@/components/ui/ImageCarousel';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import OverlappingBox from '@/components/ui/OverlappingBox';
import SafeHtmlRenderer from '@/components/ui/SafeHtmlRenderer';
import { groupConsecutiveBlocks } from '@/components/utils/groupContent';
import { LightboxContext } from '@/contexts/LightboxContext';
import { news } from '@/types/microCMS/news-types';
import { pages } from '@/types/microCMS/pages-types';

export type PagesContentBlock = NonNullable<pages<'get'>['content']>[number];
export type NewsContentBlock = NonNullable<news<'get'>['content']>[number];
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

const ContentRenderer = ({ content, className }: Props) => {
  const { openLightbox } = useContext(LightboxContext);

  const processedContent = groupConsecutiveBlocks(content);

  if (!content) {
    return null;
  }
  const Wrapper = className ? 'div' : React.Fragment;
  const wrapperProps = className ? { className: className } : {};

  return (
    <Wrapper {...wrapperProps}>
      {processedContent.map((block, index) => {
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
                : block.box_class?.[0] === '塗りつぶしボックス'
                  ? 'c-fill-box'
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

          // 5. 2カラムブロック
          case 'two_column_block': {
            return (
              <div className='l-grid l-grid--half' key={key}>
                <>
                  <ContentRenderer content={block.column_left} />
                </>
                <>
                  <ContentRenderer content={block.column_right} />
                </>
              </div>
            );
          }

          // 6. グリッドコンテンツ
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
                <MaruHeadingComponent key={key} level={headingLevel}>
                  {block.heading_content}
                </MaruHeadingComponent>
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

          // 9. カード
          case 'card': {
            const cardData = {
              title: block.card_title,
              image: block.card_image,
              description: block.card_description,
              link: block.card_link,
              buttonText: block.card_button_text,
            };
            if (!cardData) return null;
            return (
              <React.Fragment key={key}>
                <CardComponent cardData={cardData} />
              </React.Fragment>
            );
          }

          // 10.　区切り線
          case 'divider': {
            const styleMap = {
              実線: '',
              破線: 'dashed',
              点線: 'dotted',
              二重線: 'double',
              グラデーション: 'gradient',
              斜線: 'stripes',
            };

            const styleType = block.divider_style?.[0] || '実線';
            const modifier = styleMap[styleType] || '';
            const dividerClass = modifier ? `c-divider c-divider--${modifier}` : '';

            return (
              <div className='l-container l-container--full' key={key}>
                <hr aria-hidden='true' className={dividerClass} />
              </div>
            );
          }

          // 11.　重ね合わせボックス
          case 'grouped_overlapping_box': {
            const allCards = block.items.flatMap((item) => item.overlapping_cards);

            return (
              <div className='c-staggeredContainer' key={key}>
                {allCards.map((card, index) => {
                  const cardData = {
                    title: card.card_title,
                    image: card.card_image,
                    description: card.card_description,
                    link: card.card_link,
                    buttonText: card.card_button_text,
                  };

                  return <OverlappingBox boxData={cardData} key={index} />;
                })}
              </div>
            );
          }

          // 12.　開催日
          case 'event_dates': {
            const eventDate = block.event_dates;
            if (!eventDate || eventDate.length === 0) {
              return null;
            }

            const dates = eventDate
              .map((item) => new Date(item.date))
              .sort((a, b) => a.getTime() - b.getTime());

            const now = new Date();
            const lastDate = dates[dates.length - 1];
            const endOfEvent = new Date(lastDate);
            endOfEvent.setDate(endOfEvent.getDate() + 1);
            endOfEvent.setHours(0, 0, 0, 0);

            const isEndOfEvent = now >= endOfEvent;

            const eraFormatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
              era: 'long',
              year: 'numeric',
            });
            const weekdayFormatter = new Intl.DateTimeFormat('ja-JP', {
              weekday: 'short',
            });

            const firstDate = dates[0];
            const header = `${eraFormatter.format(firstDate).split('年')[0]}年開催日程は`;
            const year = firstDate.getFullYear();
            let largeDatePart = `.${firstDate.getMonth() + 1}.${firstDate.getDate()}(${weekdayFormatter.format(firstDate)})`;

            for (let i = 1; i < dates.length; i++) {
              const currentDate = dates[i];
              largeDatePart += `・${currentDate.getDate()}(${weekdayFormatter.format(currentDate)})`;
            }

            return (
              <React.Fragment key={key}>
                {isEndOfEvent && (
                  <div className='c-info-box' style={{ maxWidth: '700px' }}>
                    <p style={{ margin: 0, lineHeight: '1.5' }}>
                      {eraFormatter.format(firstDate).split('年')[0]}
                      年の納涼盆踊りは、盛況のうちに全日程を終了いたしました。
                      <wbr />
                      ご来場いただきました皆様に、心より御礼申し上げます。
                    </p>
                  </div>
                )}
                <div style={{ textAlign: 'center' }}>
                  <h3>{header}</h3>
                  <p
                    className='mt-0 mb-xxl'
                    style={{ fontSize: '200%', fontWeight: 'bold', lineHeight: '1' }}
                  >
                    <strong>
                      <span>{year}</span>
                      <span style={{ fontSize: '150%', fontWeight: 'bold', lineHeight: '1' }}>
                        {largeDatePart}
                      </span>
                    </strong>
                  </p>
                </div>
              </React.Fragment>
            );
          }

          default:
            return null;
        }
      })}
    </Wrapper>
  );
};

export default ContentRenderer;
