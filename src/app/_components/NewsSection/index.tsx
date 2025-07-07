import React from 'react';

import Link from 'next/link';

import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import NewsList from '@/components/ui/NewsList';
import { NewsListData } from '@/types';

const NewsSection = ({ data }: { data: NewsListData }) => {
  return (
    <>
      <MinchoHeadingComponent level={2}>最新情報</MinchoHeadingComponent>
      <div className='l-container--full'>
        <hr />
      </div>
      <NewsList data={data} />
      <div className='u-flex-center'>
        <Link href='/news'>
          <button className='c-button c-button--outline'>過去の記事を読む</button>
        </Link>
      </div>
    </>
  );
};

export default NewsSection;
