import React from 'react';

import { convert } from 'html-to-text';
import Link from 'next/link';

import CardComponent from '@/components/ui/CardComponent';
import PublishedDate from '@/components/ui/PublishedDate';
import { NewsListData } from '@/types';

import styles from './newsList.module.scss';

type Props = {
  data: NewsListData;
  isSimple?: boolean;
};

const NewsList = ({ data, isSimple }: Props) => {
  // isSimpleがtrueの場合、<ol><li>のリストを返す
  if (isSimple) {
    return (
      <div className='l-container px-lg'>
        <ol className={styles.list}>
          <hr />
          {data.contents.map((content) => (
            <React.Fragment key={content.id}>
              <li>
                <div className={styles.listText}>
                  <Link href={`/news/${content.id}`}>
                    <h5>{content.title}</h5>
                  </Link>
                  <div className={styles.listMeta}>
                    <Link className='c-tag c-tag--revert px-sm' href='/news'>
                      お知らせ
                    </Link>
                    <PublishedDate
                      className='u-flex-right'
                      dateString={content.publishedAt}
                      id='updated'
                    />
                  </div>
                </div>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ol>
      </div>
    );
  }

  // isSimpleがfalseの場合、カードを並べるグリッドコンテナを返す
  return (
    <div className='l-grid l-grid--grid-auto-fit'>
      {data.contents.map((content) => {
        const textBlocks = content.content
          .map((block) => {
            if (block.fieldId === 'rich_text' && block.rich_text) return block.rich_text;
            if (block.fieldId === 'heading' && block.heading_content) return block.heading_content;
            if (block.fieldId === 'boxes' && block.box_content) return block.box_content;
            return '';
          })
          .filter((text) => text)
          .join(' ');

        let description = '';
        if (textBlocks) {
          const plainText = convert(textBlocks, {
            wordwrap: false,
            selectors: [
              { selector: 'a', options: { ignoreHref: true } },
              { selector: 'img', format: 'skip' },
            ],
          });

          description = plainText.substring(0, 50).replace(/\s+$/, '') + '...';
        } else {
          description = content.title;
        }
        const date = new Date(content.publishedAt);
        const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
          era: 'long',
          year: 'numeric',
        });
        const buttonText = formatter.format(date);

        const cardData = {
          title: content.title,
          image: content.featuredImage,
          description: description,
          link: `/news/${content.id}`,
          buttonText: buttonText,
        };
        return (
          <React.Fragment key={content.id}>
            <CardComponent {...cardData} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NewsList;
