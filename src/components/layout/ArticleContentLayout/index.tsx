import React from 'react';

import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { NewsData, PageData } from '@/types';

import styles from './ArticleContentLayout.module.scss';

interface ArticleContentLayoutProps {
  title: string;
  content: PageData['content'] | NewsData['content'];
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  id?: string;
}
/**
 * ページの基本レイアウトを提供する共通コンポーネント
 * @param {string} title - ページのタイトル (h1とパンくずリストで使用)
 * @param {object} content - ContentRendererに渡すコンテンツデータ
 * @param {React.ReactNode} children - タイトルと本文の間に追加で表示する要素
 * @param {string} [id] - article要素に付与するID (任意)
 * @param {React.ReactNode} [footerContent] - 本文の下に追加で表示する要素
 */
const ArticleContentLayout = ({
  title,
  content,
  children,
  footerContent,
  id,
}: ArticleContentLayoutProps) => {
  return (
    <article className={`l-container l-container--narrow ${styles.container}`} id={id}>
      <FadeInComponent>
        <Breadcrumbs title={title} />
        <h1>{title}</h1>

        {children}

        <ContentRenderer className={styles.content} content={content} />

        {footerContent}
      </FadeInComponent>
    </article>
  );
};

export default ArticleContentLayout;
