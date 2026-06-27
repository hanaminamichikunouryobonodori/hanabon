import { cache } from 'react';

import { MicroCMSQueries } from 'microcms-js-sdk';

import { NewsData, NewsListData, PageData } from '@/types';
import { Theme } from '@/types/microCMS/theme-response';

import { client } from './client';

export const getTheme = cache(async (): Promise<Theme> => {
  try {
    return await client.getObject<Theme>({
      endpoint: 'theme',
      customRequestInit: { next: { revalidate: 3600 } },
    });
  } catch {
    return { mainColor: '#0d4396', subColor: '#f19bc0' };
  }
});

export const getHomeContentById = async (contentId: string, draftKey?: string) => {
  try {
    const data: PageData = await client.get({
      endpoint: 'pages',
      contentId: contentId,
      queries: { draftKey: draftKey },
      customRequestInit: { next: { revalidate: draftKey ? 0 : 3600 } },
    });

    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};

export const getNewsList = async (type: 'home' | 'all') => {
  try {
    const queries: MicroCMSQueries = {
      orders: '-publishedAt',
      filters: 'publishedAt[exists]',
    };
    if (type === 'home') {
      queries.limit = 3;
    }
    const data: NewsListData = await client.get({
      endpoint: 'news',
      queries: queries,
      customRequestInit: { next: { revalidate: 3600 } },
    });

    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};

export const getNewsContentById = async (contentId: string, draftKey?: string) => {
  try {
    const data: NewsData = await client.get({
      endpoint: 'news',
      contentId,
      queries: { draftKey: draftKey },
      customRequestInit: { next: { revalidate: draftKey ? 0 : 3600 } },
    });
    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};
