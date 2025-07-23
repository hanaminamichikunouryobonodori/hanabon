'use client';

import Image from 'next/image';

import PostNavigation from '@/components/features/NewsList/PostNavigation';
import ArticleContentLayout from '@/components/layout/ArticleContentLayout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PublishedDate from '@/components/ui/PublishedDate';
import { getElapsedYears } from '@/libs/dateUtils';
import { NewsListData, NewsData } from '@/types';

import styles from './post.module.scss';

type Props = {
  currentPostData: NewsData;
  allPosts: NewsListData['contents'];
};

export default function NewsArticle({ currentPostData, allPosts }: Props) {
  const elapsedYears = getElapsedYears(currentPostData.publishedAt);
  const isOldPost = elapsedYears >= 1;
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
      {isOldPost && (
        <div className='c-info-box'>
          {/* 経過年数を動的に表示 */}
          <p>
            この記事は公開から{elapsedYears}年以上が経過しています。情報が古い可能性があります。
          </p>
        </div>
      )}
    </ArticleContentLayout>
  );
}
