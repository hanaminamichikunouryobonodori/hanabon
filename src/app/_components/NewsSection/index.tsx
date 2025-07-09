import React from 'react';

import Link from 'next/link';

import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import NewsList from '@/components/ui/NewsList';
import { NewsData, NewsListData } from '@/types';

import JoinCommitteeSection from '../JoinCommitteeSection';

const NewsSection = ({ news, joinCommittee }: { news: NewsListData; joinCommittee: NewsData }) => {
  return (
    <>
      <MinchoHeadingComponent id='news' level={2}>
        最新情報
      </MinchoHeadingComponent>
      <NewsList data={news} isSimple={true} />
      <div className='u-flex-center'>
        <Link href='/news'>
          <button className='c-button c-button--outline'>過去の記事を読む</button>
        </Link>
      </div>
      <div className='l-container l-container--full my-xl'>
        <hr className='c-divider c-divider--dashed' style={{ borderColor: 'var(--lineColor)' }} />
      </div>
      <JoinCommitteeSection data={joinCommittee} />
    </>
  );
};

export default NewsSection;
