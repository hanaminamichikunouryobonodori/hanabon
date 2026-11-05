import { cache } from 'react';

import * as holidayJp from '@holiday-jp/holiday_jp';
import { MicroCMSQueries } from 'microcms-js-sdk';

import { NewsData, NewsListData, PageData } from '@/types';
import { Theme } from '@/types/microCMS/theme-response';

import { client } from './client';
import { toJstParts } from './jstDate';

/**
 * 開催日ブロック（event_dates）の各日付に、祝日かどうか（is_holiday）を付け足す。
 * 祝日の判定はサーバー側（ビルド時・再生成時）だけで行い、
 * 祝日データ（@holiday-jp/holiday_jp）をブラウザに送らないようにする。
 */
const annotateHolidays = <T extends { content?: unknown }>(data: T): T => {
  if (!Array.isArray(data.content)) return data;
  for (const block of data.content as { fieldId?: string; event_dates?: unknown }[]) {
    if (block.fieldId !== 'event_dates' || !Array.isArray(block.event_dates)) continue;
    for (const item of block.event_dates as { date?: string; is_holiday?: boolean }[]) {
      if (!item.date) continue;
      const { year, month, day } = toJstParts(new Date(item.date));
      item.is_holiday = holidayJp.isHoliday(new Date(year, month - 1, day));
    }
  }
  return data;
};

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

    return annotateHolidays(data);
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
    return annotateHolidays(data);
  } catch (error) {
    console.error('microCMSからのデータ取得に失敗しました。', error);
    throw new Error('Failed to fetch content from microCMS.');
  }
};
