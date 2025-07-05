import { notFound } from 'next/navigation';

import { getNewsContentById, getNewsList } from '@/libs/microCMS';
import { NewsData, NewsListData } from '@/types';

import NewsArticle from './NewsArticle';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 60;

async function getPostData(slug: string, draftKey?: string) {
  if (!slug) return null;
  try {
    return await getNewsContentById(slug, draftKey);
  } catch (error) {
    console.error('Data fetch error for slug:', slug, error);
    return null;
  }
}

export default async function NewsPage(props: Props) {
  const params = await props.params;
  const draftKey = (await props.searchParams)?.draftKey as string | undefined;
  const currentPostData = await getPostData(params.slug, draftKey);

  if (!currentPostData) {
    return notFound();
  }
  const allPosts: NewsListData = await getNewsList('all');

  if (!currentPostData || !currentPostData.id) {
    throw new Error('ページが存在しません');
  }
  if (!allPosts.contents || !allPosts.contents.length) {
    throw new Error('記事がありません');
  }

  return <NewsArticle allPosts={allPosts.contents} currentPostData={currentPostData} />;
}

export const generateStaticParams = async () => {
  const data = await getNewsList('all');
  return data.contents.map((content: NewsData) => ({
    slug: content.id,
  }));
};
