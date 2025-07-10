'use client';

import { JSX, useEffect } from 'react';
import { scroller } from 'react-scroll';

import AboutSection from '@/app/_components/AboutSection';
import AccessSection from '@/app/_components/AccessSection';
import ContactSection from '@/app/_components/ContactSection';
import EventDateSection from '@/app/_components/EventDateSection';
import GallerySection from '@/app/_components/GallerySection';
import NewsSection from '@/app/_components/NewsSection';
import SponsorshipSection from '@/app/_components/SponsorshipSection';
import { FadeInComponent } from '@/components/animations/FadeIn';
import { JsonLd } from '@/components/common/JsonLd';
import useSessionStorage from '@/hooks/useSessionStorage';
import { HomePageProps } from '@/types';

type Section = {
  id: keyof HomePageProps;
  component: JSX.Element;
};

const HomeClient = ({ pages }: { pages: HomePageProps }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hanabon.vercel.app/';
  const [scrollTarget, setScrollTarget] = useSessionStorage('scrollTo', null);

  useEffect(() => {
    const targetId = sessionStorage.getItem('scrollTo');
    if (targetId) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        scroller.scrollTo(targetId, {
          duration: 800,
          smooth: 'easeInOutQuart',
          offset: -130,
        });
      }, 500);
      setScrollTarget(null);
    }
  }, [scrollTarget, setScrollTarget]);

  const sections: Section[] = [
    { id: 'eventDate', component: <EventDateSection data={pages.eventDate} /> },
    {
      id: 'about',
      component: <AboutSection data={pages.about} />,
    },
    { id: 'gallery', component: <GallerySection data={pages.gallery} /> },
    {
      id: 'news',
      component: <NewsSection joinCommittee={pages.joinCommittee} news={pages.news} />,
    },
    { id: 'access', component: <AccessSection data={pages.access} /> },
    { id: 'contact', component: <ContactSection /> },
    {
      id: 'sponsorship',
      component: <SponsorshipSection data={pages.sponsorship} />,
    },
  ];
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: siteUrl,
      },
    ],
  };
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://hanabon.vercel.app/',
    name: '花南地区納涼盆踊り',

    publisher: {
      '@type': 'Organization',
      name: '花南地区納涼盆踊り実行委員会',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hanabon.vercel.app/images/hanabonLogo.webp',
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={jsonLdData} />
      {sections.map((section, index) => {
        const componentData = pages[section.id];
        if (section.id !== 'contact' && !componentData) return null;
        const isEven = (index + 1) % 2 === 0;

        const component = (
          <section className={`py-3xl ${isEven ? 'u-bg-secondary' : ''}`} key={section.id}>
            <div
              className='l-container u-min-h-screen u-flex-center-column'
              id={`${section.id}Section`}
            >
              {section.component}
            </div>
          </section>
        );

        if (section.id === 'about') {
          return component;
        }

        return <FadeInComponent key={section.id}>{component}</FadeInComponent>;
      })}
    </>
  );
};

export default HomeClient;
