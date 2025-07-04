import Hero from '@/app/_components/HeroSection';
import HomeClient from '@/app/HomeClient';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { client } from '@/libs/client';
import { getHomeContentById, getNewsContentById, getNewsList } from '@/libs/microCMS';
import { HomePageProps } from '@/types';

import styles from './page.module.scss';

export const revalidate = 60;

export default async function Home() {
  const homepageData = await client.getObject<HomePageProps>({
    endpoint: 'homepage',
  });

  const dataPromises = {
    hero: getHomeContentById(homepageData.hero.id),
    eventDate: getHomeContentById(homepageData.eventDate.id),
    about: getHomeContentById(homepageData.about.id),
    gallery: getHomeContentById(homepageData.gallery.id),
    news: getNewsList('home'),
    joinCommittee: getNewsContentById(homepageData.joinCommittee.id),
    access: getHomeContentById(homepageData.access.id),
    sponsorship: getHomeContentById(homepageData.sponsorship.id),
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
