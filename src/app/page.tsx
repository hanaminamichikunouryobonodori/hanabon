import Hero from '@/app/_components/HeroSection';
import HomeClient from '@/app/HomeClient';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { getHomeContentById, getNewsContentById, getNewsList } from '@/libs/microcms';
import { HomePageProps } from '@/types/microCMS';

import styles from './page.module.scss';

export const revalidate = 60;

export default async function Home() {
  const dataPromises = {
    hero: getHomeContentById('cet87w1qfnqi'),
    eventDate: getHomeContentById('av-ykq9lgd'),
    about: getHomeContentById('6dcij7mdi'),
    gallery: getHomeContentById('fwutln7-vv65'),
    news: getNewsList('home'),
    joinCommittee: getNewsContentById('v10odqxz0'),
    access: getHomeContentById('1aqvnomonyj'),
    sponsorship: getHomeContentById('uoln1k6t8q'),
  };

  const promiseKeys = Object.keys(dataPromises) as Array<keyof typeof dataPromises>;

  const results = await Promise.all(Object.values(dataPromises));

  const fetchedData = promiseKeys.reduce((acc, key, index) => {
    acc[key] = results[index];
    return acc;
  }, {} as HomePageProps);

  const pages: HomePageProps = {
    hero: fetchedData.hero,
    eventDate: fetchedData.eventDate,
    about: fetchedData.about,
    gallery: fetchedData.gallery,
    news: fetchedData.news,
    joinCommittee: fetchedData.joinCommittee,
    access: fetchedData.access,
    sponsorship: fetchedData.sponsorship,
    contact: null,
  };

  return (
    <main className={styles.root} id='top'>
      <Hero data={pages.hero} />
      <Header />
      <HomeClient pages={pages} />
      <Footer />
    </main>
  );
}
