import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/common/JsonLd';
import { getNewsContentById, getNewsList, getTheme } from '@/libs/microCMS';
import { generatePlainText } from '@/libs/plainText';
import { NewsData, NewsListData } from '@/types';

import NewsArticle from './NewsArticle';

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
  const [currentPostData, theme] = await Promise.all([
    getPostData(params.slug, draftKey),
    getTheme(),
  ]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hanabon.vercel.app/';
  const fallbackOgp = theme.ogpImage?.url ?? `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP2026.png`;

  if (!currentPostData) {
    return notFound();
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'お知らせ一覧',
        item: `${siteUrl}/news`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentPostData.title,
        item: `${siteUrl}/news/${params.slug}`,
      },
    ],
  };

  const jsonLd = {
    '@context': 'http://googleusercontent.com/schema.org/',
    '@type': 'NewsArticle',
    headline: currentPostData.title,
    image: [
      currentPostData.featuredImage?.url || fallbackOgp,
    ],
    datePublished: currentPostData.publishedAt,
    dateModified: currentPostData.revisedAt,
    author: {
      '@type': 'Organization',
      name: '花南地区納涼盆踊り実行委員会',
    },
  };

  const allPosts: NewsListData = await getNewsList('all');

  if (!currentPostData || !currentPostData.id) {
    throw new Error('ページが存在しません');
  }
  if (!allPosts.contents || !allPosts.contents.length) {
    throw new Error('記事がありません');
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={jsonLd} />
      <NewsArticle allPosts={allPosts.contents} currentPostData={currentPostData} />
    </>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const draftKey = (await props.searchParams)?.draftKey as string | undefined;
  const data = await getPostData(params.slug, draftKey);

  if (!data) {
    return { title: '記事が見つかりません' };
  }
  const theme = await getTheme();
  const featuredImageUrl = data.featuredImage?.url;
  const ogpImageUrl =
    featuredImageUrl ??
    theme.ogpImage?.url ??
    `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP2026.png`;
  const description = generatePlainText(data, 100);

  return {
    title: `${data.title} | ${process.env.SITE_NAME}`,
    description: description,
    twitter: {
      title: `${data.title} | ${process.env.SITE_NAME}`,
      images: [ogpImageUrl],
      description: description,
    },
    openGraph: {
      type: 'article',
      description: description,
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
