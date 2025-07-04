import { convert } from 'html-to-text';
import { Metadata } from 'next';
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

  return (
    <>
      <NewsArticle allPosts={allPosts.contents} currentPostData={currentPostData} />;
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
  const featuredImageUrl = data.featuredImage?.url;
  const ogpImageUrl = featuredImageUrl
    ? featuredImageUrl
    : `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP.png`;

  const textBlocks = data.content
    .map((block) => {
      if (block.fieldId === 'rich_text' && block.rich_text) return block.rich_text;
      if (block.fieldId === 'heading' && block.heading_content) return block.heading_content;
      if (block.fieldId === 'boxes' && block.box_content) return block.box_content;
      return '';
    })
    .filter((text) => text)
    .join(' ');

  let description = '';
  if (textBlocks) {
    const plainText = convert(textBlocks, {
      wordwrap: false,
      selectors: [{ selector: 'a', options: { ignoreHref: true } }], // aタグのURLを非表示に
    });

    description = plainText.substring(0, 120).replace(/\s+$/, '') + '...';
  } else {
    description = data.title;
  }

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
