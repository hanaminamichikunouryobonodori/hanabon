'use client';

import { JSX, useEffect, useState } from 'react';
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
import LoadingScreen from '@/components/ui/LoadingScreen';
import { HomePageProps } from '@/types';

type Section = {
  id: keyof HomePageProps;
  component: JSX.Element;
};

const HomeClient = ({ pages }: { pages: HomePageProps }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          scroller.scrollTo(targetId, {
            duration: 800,
            smooth: 'easeInOutQuad',
          });
        }
      }, 100);
    }
  }, [isLoading]);

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
        url: 'https://hanabon.vercel.app/images/hanabonLogo.png',
      },
    },
  };
  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <JsonLd data={jsonLdData} />
      {sections.map((section, index) => {
        const componentData = pages[section.id];
        if (section.id !== 'contact' && !componentData) return null;

        const isEven = (index + 1) % 2 === 0;
        return (
          <FadeInComponent key={section.id}>
            <section className={`py-xxl ${isEven ? 'u-bg-secondary' : ''}`}>
              <div className='l-container u-min-h-screen u-flex-center-column' id={section.id}>
                {section.component}
              </div>
            </section>
          </FadeInComponent>
        );
      })}
    </>
  );
};

export default HomeClient;
