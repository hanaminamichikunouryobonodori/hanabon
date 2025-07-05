'use client';

import styles from '@/app/news/[slug]/post.module.scss';
import ContentRenderer from '@/components/common/ContentRenderer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PageData } from '@/types';

type Props = {
  data: PageData;
};

export default function PrivacyClient({ data }: Props) {
  return (
    <article className={`${styles.container} l-container l-container--narrow`} id='policy'>
      <Breadcrumbs />
      <h1>{data.title}</h1>
      <ContentRenderer className={styles.content} content={data.content} />
    </article>
  );
}
