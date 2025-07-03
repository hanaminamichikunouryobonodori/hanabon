'use client';
import { useState, useMemo } from 'react';

import Fuse, { type IFuseOptions } from 'fuse.js';

import { FadeInComponent } from '@/components/animations/FadeIn';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import NewsList from '@/components/ui/NewsList';
import { NewsData, NewsListData } from '@/types';

type Props = {
  allNews: NewsListData;
};

const fuseOptions: IFuseOptions<NewsData> = {
  findAllMatches: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  threshold: 0.3,
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'content.heading_content', weight: 1.5 },
    { name: 'content.rich_text', weight: 1.0 },
    { name: 'content.box_content', weight: 1.0 },
    { name: 'content.column_left.rich_text', weight: 0.5 },
    { name: 'content.column_right.rich_text', weight: 0.5 },
    { name: 'content.column_left.box_content', weight: 0.5 },
    { name: 'content.column_right.box_content', weight: 0.5 },
  ],
  includeScore: true,
  includeMatches: false, // デバッグ中はtrueにする
};

const SearchableNewsList = ({ allNews }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(() => new Fuse(allNews.contents, fuseOptions), [allNews]);

  const filteredNewsList = useMemo(() => {
    // 検索キーワードが入力されていない場合は、元のデータをそのまま返す
    if (!searchQuery || searchQuery.length < fuseOptions.minMatchCharLength!) {
      return allNews;
    }
    // Fuse.jsで検索を実行する
    const results = fuse.search(searchQuery);

    // 検索結果（記事の配列）を取得する
    const filteredContents = results.map((result) => result.item);
    // ★ 検索結果の配列を、NewsListが期待するオブジェクトの形に再構築する
    return {
      ...allNews,
      contents: filteredContents,
    };
  }, [allNews, fuse, searchQuery]);

  return (
    <FadeInComponent>
      <div className='l-container l-grid l-grid--grid-auto-fit'>
        <Breadcrumbs />
        <div className='search-form-container  u-flex-right'>
          <input
            className='c-search-input my-sm'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='&#x1f50e;お知らせを検索...'
            type='search'
            value={searchQuery}
          />
        </div>
      </div>
      <div className='l-container u-min-h-screen py-lg'>
        <NewsList data={filteredNewsList} />
        {filteredNewsList.contents.length === 0 && searchQuery && (
          <p>「{searchQuery}」に一致するお知らせはありませんでした。</p>
        )}
        <Breadcrumbs />
      </div>
    </FadeInComponent>
  );
};

export default SearchableNewsList;
