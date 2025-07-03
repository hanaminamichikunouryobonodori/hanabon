// ★ ファイルの先頭に 'use client' を記述
'use client';

import Image from 'next/image';

import ContentRenderer from '@/components/common/ContentRenderer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PostNavigation from '@/components/ui/NewsList/PostNavigation';
import PublishedDate from '@/components/ui/PublishedDate';
import { NewsListData, NewsData } from '@/types/microCMS';

import styles from './post.module.scss';

type Props = {
  currentPostData: NewsData;
  allPosts: NewsListData['contents'];
};

export default function NewsArticle({ currentPostData, allPosts }: Props) {
  return (
    <article className={`l-container l-container--narrow ${styles.container}`}>
      <Breadcrumbs title={currentPostData.title} />
      <h1>{currentPostData.title}</h1>
      <div>
        <PublishedDate dateString={currentPostData.publishedAt} />
      </div>
      <div className={styles.featuredImageContainer}>
        <Image
          alt={currentPostData.title}
          fill
          sizes='100vw'
          src={currentPostData.featuredImage?.url ?? '/images/noImage.png'}
        />
      </div>
      <ContentRenderer className={styles.content} content={currentPostData.content} />
      <PostNavigation allPosts={allPosts} currentPost={currentPostData} />
      <Breadcrumbs title={currentPostData.title} />
    </article>
  );
}
