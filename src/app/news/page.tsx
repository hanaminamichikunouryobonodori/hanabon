import PageHeader from '@/components/common/PageHeader';
import SearchableNewsList from '@/components/features/SearchableNewsList';
import { getNewsList } from '@/libs/microcms';
import { NewsListData } from '@/types/microCMS';

const News = async () => {
  const data: NewsListData = await getNewsList('all');
  return (
    <>
      <PageHeader>お知らせ一覧</PageHeader>
      <SearchableNewsList allNews={data} />
    </>
  );
};

export default News;
