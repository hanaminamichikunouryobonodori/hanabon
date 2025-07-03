import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getNewsContentById, getNewsList } from '@/libs/microcms';
import { NewsData, NewsListData } from '@/types/microCMS';

import NewsArticle from './NewsArticle';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

async function getPostData(slug: string) {
  try {
    if (!slug) return null;
    const postData = await getNewsContentById(slug);
    return postData;
  } catch (error) {
    console.error('Data fetch error for slug:', slug, error);
    return null;
  }
}

export default async function NewsPage(props: Props) {
  const params = await props.params;
  const currentPostData = await getPostData(params.slug);
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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const data = await getPostData(params.slug);

  if (!data) {
    return { title: '記事が見つかりません' };
  }
  const featuredImageUrl = data.featuredImage?.url;
  const ogpImageUrl = featuredImageUrl
    ? featuredImageUrl
    : `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP.png`;
  return {
    title: `${data.title} | ${process.env.SITE_NAME}`,
    twitter: {
      title: `${data.title} | ${process.env.SITE_NAME}`,
      images: [ogpImageUrl],
    },
    openGraph: {
      type: 'article',
      url: process.env.NEXT_PUBLIC_DOMAIN,
      title: `${data.title} | ${process.env.SITE_NAME}`,
      images: [
        {
          url: ogpImageUrl,
        },
      ],
    },
  };
}

export const generateStaticParams = async () => {
  const data = await getNewsList('all');
  return data.contents.map((content: NewsData) => ({
    slug: content.id,
  }));
};
