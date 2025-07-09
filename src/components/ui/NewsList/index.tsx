import React from 'react';

import { convert } from 'html-to-text';
import Link from 'next/link';

import CardComponent from '@/components/ui/CardComponent';
import PublishedDate from '@/components/ui/PublishedDate';
import { NewsListData } from '@/types';

import styles from './newsList.module.scss';
import { generatePlainText } from '@/libs/plainText';

type Props = {
  data: NewsListData;
  isSimple?: boolean;
};

/**
 * 指定された日付文字列が現在から1ヶ月以内であるかを判定します。
 * @param {string} dateString - ISO 8601形式の日付文字列 (例: '2025-07-08T10:00:00.000Z')
 * @returns {boolean} 1ヶ月以内であればtrue、そうでなければfalse
 */
const isWithinOneMonth = (dateString: string): boolean => {
  if (!dateString) return false;

  const publishedDate = new Date(dateString);
  const today = new Date();

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return publishedDate > oneMonthAgo;
};

const NewsList = ({ data, isSimple }: Props) => {
  // isSimpleがtrueの場合、<ol><li>のリストを返す
  if (isSimple) {
    return (
      <div className='l-container px-lg'>
        <ol className={styles.list}>
          <hr />
          {data.contents.map((content) => {
            const isNew = isWithinOneMonth(content.publishedAt);
            return (
              <React.Fragment key={content.id}>
                <li>
                  <div className={styles.listText}>
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
                    <div className={styles.listTitle}>
                      <Link href={`/news/${content.id}`}>
                        <h5>{content.title}</h5>
                      </Link>
                      {isNew && <span className={styles.newBadge}>New!!</span>}
                    </div>
                  </div>
                </li>
                <hr />
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    );
  }

  // isSimpleがfalseの場合、カードを並べるグリッドコンテナを返す
  return (
    <div className='l-grid l-grid--grid-auto-fit'>
      {data.contents.map((content, index) => {
        const description = generatePlainText(content, 50);
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
          priority: index === 0,
        };
        return (
          <React.Fragment key={content.id}>
            <CardComponent cardData={cardData} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NewsList;
