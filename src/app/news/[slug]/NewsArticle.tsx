// ★ ファイルの先頭に 'use client' を記述
'use client';

import Image from 'next/image';

import ArticleContentLayout from '@/components/layout/ArticleContentLayout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PostNavigation from '@/components/ui/NewsList/PostNavigation';
import PublishedDate from '@/components/ui/PublishedDate';
import { NewsListData, NewsData } from '@/types';

import styles from './post.module.scss';

type Props = {
  currentPostData: NewsData;
  allPosts: NewsListData['contents'];
};

export default function NewsArticle({ currentPostData, allPosts }: Props) {
  return (
    <ArticleContentLayout
      content={currentPostData.content}
      footerContent={
        <>
          <PostNavigation allPosts={allPosts} currentPost={currentPostData} />
          <Breadcrumbs title={currentPostData.title} />
        </>
      }
      title={currentPostData.title}
    >
      {/* childrenとして渡す要素 */}
      <PublishedDate className='u-flex-right mx-sm' dateString={currentPostData.publishedAt} />
      <div className={styles.featuredImageContainer}>
        <Image
          alt={currentPostData.title}
          fill
          sizes='100vw'
          src={currentPostData.featuredImage?.url ?? '/images/noImage.png'}
        />
      </div>
    </ArticleContentLayout>
  );
}
