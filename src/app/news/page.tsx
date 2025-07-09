import { Metadata } from 'next';

import { JsonLd } from '@/components/common/JsonLd';
import PageHeader from '@/components/common/PageHeader';
import SearchableNewsList from '@/components/features/SearchableNewsList';
import { getNewsList } from '@/libs/microCMS';
import { NewsListData } from '@/types';

const News = async () => {
  const data: NewsListData = await getNewsList('all');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hanabon.vercel.app/';

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
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'お知らせ一覧',
    numberOfItems: data.contents.length,
    itemListElement: data.contents.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'NewsArticle',
        headline: post.title,
        url: `${siteUrl}/news/${post.id}`,
        image: post.featuredImage?.url || `${siteUrl}/hanabonOGP.png`,
        datePublished: post.publishedAt,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <PageHeader>お知らせ一覧</PageHeader>
      <SearchableNewsList allNews={data} />
    </>
  );
};

export default News;

export const metadata: Metadata = {
  title: `お知らせ一覧 | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};
