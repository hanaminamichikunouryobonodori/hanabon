import { MetadataRoute } from 'next';

import { getNewsList } from '@/libs/microCMS';
import { NewsData } from '@/types';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'https://hanabon.vercel.app';

  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const newsPosts = await getNewsList('all');
    newsPages = newsPosts.contents.map((post: NewsData) => ({
      url: `${BASE_URL}/news/${post.id}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
  } catch (error) {
    console.error('Sitemap generation: Failed to fetch news posts.', error);
  }

  return [...defaultPages, ...newsPages];
}
