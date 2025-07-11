import React from 'react';

import Link from 'next/link';

import { FadeInComponent } from '@/components/animations/FadeIn';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import NewsList from '@/components/ui/NewsList';
import { NewsData, NewsListData } from '@/types';

import JoinCommitteeSection from '../JoinCommitteeSection';

import styles from './NewsSection.module.scss';

const NewsSection = ({ news, joinCommittee }: { news: NewsListData; joinCommittee: NewsData }) => {
  return (
    <FadeInComponent>
      <div className='u-flex-center-column'>
        <MaruHeadingComponent className={styles.title} id='news' level={2}>
          最新情報
        </MaruHeadingComponent>
        <div
          className={`${styles.box} c-sticky-box u-flex-center-column`}
          style={{ borderEndEndRadius: '24px', borderStartEndRadius: '24px' }}
        >
          <NewsList data={news} isSimple={true} />
          <div className='u-flex-center'>
            <Link href='/news'>
              <button className='c-button c-button--outline'>過去の記事を読む</button>
            </Link>
          </div>
        </div>
        <div className='my-xl'>
          <JoinCommitteeSection data={joinCommittee} />
        </div>
      </div>
    </FadeInComponent>
  );
};

export default NewsSection;
