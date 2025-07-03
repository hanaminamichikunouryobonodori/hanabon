import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getNewsContentById, getNewsList } from '@/libs/microcms';
import { NewsData, NewsListData } from '@/types/microCMS';

import NewsArticle from './NewsArticle';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
};

export const revalidate = 60;

export default async function NewsPage(props: Props) {
  try {
    if (!props.params.slug) {
      return notFound();
    }
    const currentPostData: NewsData = await getNewsContentById(props.params.slug);
    const allPosts: NewsListData = await getNewsList('all');

    if (!currentPostData || !currentPostData.id) {
      throw new Error('ページが存在しません');
    }
    if (!allPosts.contents || !allPosts.contents.length) {
      throw new Error('記事がありません');
    }

    return <NewsArticle allPosts={allPosts.contents} currentPostData={currentPostData} />;
  } catch (error) {
    console.error('Error fetching news data:', error);
    return notFound();
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await getNewsContentById(params.slug);

    if (!data || !data.id) {
      throw new Error('ページが存在しません');
    }
    const featuredImageUrl = data.featuredImage?.url;

    // ▼▼▼ 修正点2: OGP画像のURLを正しく設定 ▼▼▼
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
  } catch (error) {
    console.error('Error fetching news data:', error);
    return notFound();
  }
}

export const generateStaticParams = async () => {
  try {
    const data = await getNewsList('all');
    return data.contents.map((content: NewsData) => ({
      slug: content.id,
    }));
  } catch (error) {
    console.error('Error fetching static params:', error);
    return [];
  }
};
