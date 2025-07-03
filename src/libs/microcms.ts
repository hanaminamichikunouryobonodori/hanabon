import { MicroCMSQueries } from 'microcms-js-sdk';

import { client } from './client';
import { NewsData, NewsListData, PageData } from '@/types';

export const getHomeContentById = async (contentId: string) => {
  try {
    const data: PageData = await client.get({
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
    const data: NewsListData = await client.get({
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
    const data: NewsData = await client.get({
      endpoint: 'news',
      contentId,
    });
    return data;
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};
