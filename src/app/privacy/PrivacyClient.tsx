'use client';

import ArticleContentLayout from '@/components/layout/ArticleContentLayout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PageData } from '@/types';

type Props = {
  data: PageData;
};

export default function PrivacyClient({ data }: Props) {
  return (
    <ArticleContentLayout
      content={data.content}
      footerContent={<Breadcrumbs title={data.title} />}
      id='policy'
      title={data.title}
    />
  );
}
