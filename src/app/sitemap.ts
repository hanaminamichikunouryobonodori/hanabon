import { MetadataRoute } from 'next';

import { getNewsList } from '@/libs/microcms';
import { NewsData } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'https://hanabon.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
    },
  ];

  const newsPosts = await getNewsList('all');

  const newsPages: MetadataRoute.Sitemap = newsPosts.contents.map((post: NewsData) => ({
    url: `${BASE_URL}/news/${post.id}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...defaultPages, ...newsPages];
}
