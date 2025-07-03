import PageHeader from '@/components/common/PageHeader';
import SearchableNewsList from '@/components/features/SearchableNewsList';
import { getNewsList } from '@/libs/microCMS';
import { NewsListData } from '@/types';

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
