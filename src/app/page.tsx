import Hero from '@/app/_components/HeroSection';
import HomeClient from '@/app/HomeClient';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { client } from '@/libs/client';
import { getHomeContentById, getNewsContentById, getNewsList } from '@/libs/microCMS';
import { HomePageProps } from '@/types';

import styles from './page.module.scss';
import { get } from 'http';

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const draftKey = (await props.searchParams)?.draftKey as string | undefined;

  const homepageData = await client.getObject<HomePageProps>({
    endpoint: 'homepage',
    queries: { draftKey: draftKey },
  });

  const dataPromises = {
    hero: getHomeContentById(homepageData.hero.id, draftKey),
    eventDate: getHomeContentById(homepageData.eventDate.id, draftKey),
    about: Promise.all(homepageData.about.map((item) => getHomeContentById(item.id, draftKey))),
    gallery: getHomeContentById(homepageData.gallery.id, draftKey),
    news: getNewsList('home'),
    joinCommittee: getNewsContentById(homepageData.joinCommittee.id, draftKey),
    access: getHomeContentById(homepageData.access.id, draftKey),
    sponsorship: getHomeContentById(homepageData.sponsorship.id, draftKey),
  };

  const promiseKeys = Object.keys(dataPromises) as Array<keyof typeof dataPromises>;

  const results = await Promise.all(Object.values(dataPromises));
  const entries = promiseKeys.map((key, index) => [key, results[index]]);
  const fetchedData = Object.fromEntries(entries) as HomePageProps;

  const pages: HomePageProps = {
    ...fetchedData,
    contact: null,
  };

  return (
    <main className={styles.root}>
      <Hero data={pages.hero} />
      <Header />
      <HomeClient pages={pages} />
      <Footer />
    </main>
  );
}
