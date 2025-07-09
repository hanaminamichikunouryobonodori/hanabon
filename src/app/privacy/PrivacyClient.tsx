'use client';

import { JsonLd } from '@/components/common/JsonLd';
import ArticleContentLayout from '@/components/layout/ArticleContentLayout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PageData } from '@/types';

type Props = {
  data: PageData;
};

export default function PrivacyClient({ data }: Props) {
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
        name: 'プライバシーポリシー',
        item: `${siteUrl}/privacy`,
      },
    ],
  };

  const jsonLd = {
    '@context': 'http://googleusercontent.com/schema.org/',
    '@type': 'Article',
    headline: data.title,
    image: [`${process.env.NEXT_PUBLIC_SITE_URL}/hanabonOGP.png`],
    datePublished: data.publishedAt,
    dateModified: data.revisedAt,
    author: {
      '@type': 'Organization',
      name: '花南地区納涼盆踊り実行委員会',
    },
  };
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={jsonLd} />
      <ArticleContentLayout
        content={data.content}
        footerContent={<Breadcrumbs title={data.title} />}
        id='policy'
        title={data.title}
      />
    </>
  );
}
