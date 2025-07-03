import Hero from '@/app/_components/HeroSection';
import HomeClient from '@/app/HomeClient';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { getHomeContentById, getNewsContentById, getNewsList } from '@/libs/microCMS';
import { HomePageProps } from '@/types';

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
  const entries = promiseKeys.map((key, index) => [key, results[index]]);
  const fetchedData = Object.fromEntries(entries) as HomePageProps;

  const pages: HomePageProps = {
    ...fetchedData,
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
