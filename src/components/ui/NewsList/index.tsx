import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { NewsListData } from '@/types/microCMS';

import PublishedDate from '../PublishedDate';

import styles from './newsList.module.scss';
const NewsList = ({ data }: { data: NewsListData }) => {
  return (
    <div className={styles.container}>
      <ol>
        {data.contents.map((content) => {
          const imageUrl = content.featuredImage?.url ?? '/images/noImage.png';
          const imageWidth = content.featuredImage?.width ?? 256;
          const imageHeight = content.featuredImage?.height ?? 192;
          return (
            <React.Fragment key={content.id}>
              <li>
                <div className='l-grid l-grid--3-7'>
                  <div>
                    <Link href={`news/${content.id}`}>
                      <Image
                        alt={content.title}
                        className='u-responsive-image rounded-md'
                        height={imageHeight}
                        src={imageUrl}
                        width={imageWidth}
                      />
                    </Link>
                  </div>
                  <div className={styles.listText}>
                    <Link href={`news/${content.id}`}>
                      <h3>{content.title}</h3>
                    </Link>
                    <PublishedDate className={styles.date} dateString={content.publishedAt} />
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
};

export default NewsList;
