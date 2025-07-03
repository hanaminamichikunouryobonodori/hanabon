import { MicroCMSQueries } from 'microcms-js-sdk';

import { NewsContentProps, NewsListProps, PagesProps } from '@/types/microCMS';

import { client } from './client';

export const getHomeContentById = async (contentId: string) => {
  try {
    const data: PagesProps = await client.get({
      endpoint: 'pages',
      contentId: contentId,
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
    const data: NewsListProps = await client.get({
      endpoint: 'news',
      queries: queries,
    });

    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};

export const getNewsContentById = async (contentId: string) => {
  try {
    const data: NewsContentProps = await client.get({
      endpoint: 'news',
      contentId,
    });
    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};
