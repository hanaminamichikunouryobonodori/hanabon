import { news } from './microCMS/news-types';
import { pages } from './microCMS/pages-types';

export type PageData = pages<'get'>;
export type NewsListData = news<'gets'>;
export type NewsData = news<'get'>;

export type HomePageProps = {
  hero: PageData;
  eventDate: PageData;
  about: PageData[];
  gallery: PageData;
  news: NewsListData;
  joinCommittee: NewsData;
  access: PageData;
  sponsorship: PageData;
  contact?: null;
};
