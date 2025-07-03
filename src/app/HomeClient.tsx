'use client';

import { JSX } from 'react';
import { Element } from 'react-scroll';

import dynamic from 'next/dynamic';

import { FadeInComponent } from '@/components/animations/FadeIn';
import { HomePageProps } from '@/types';

const EventDateSection = dynamic(() => import('@/app/_components/EventDateSection'));
const AboutSection = dynamic(() => import('@/app/_components/AboutSection'));
const GallerySection = dynamic(() => import('@/app/_components/GallerySection'));
const SponsorshipSection = dynamic(() => import('@/app/_components/SponsorshipSection'));
const NewsSection = dynamic(() => import('@/app/_components/NewsSection'));
const JoinCommitteeSection = dynamic(() => import('@/app/_components/JoinCommitteeSection'));
const AccessSection = dynamic(() => import('@/app/_components/AccessSection'));
const ContactSection = dynamic(() => import('@/app/_components/ContactSection'));

type Section = {
  id: keyof HomePageProps;
  component: JSX.Element;
};

const HomeClient = ({ pages }: { pages: HomePageProps }) => {
  const sections: Section[] = [
    { id: 'eventDate', component: <EventDateSection data={pages.eventDate} /> },
    {
      id: 'about',
      component: (
        <>
          <Element className='l-container--full' name='about'>
            <AboutSection data={pages.about} />
          </Element>
          <Element className='l-container--full' name='gallery'>
            <GallerySection data={pages.gallery} />
          </Element>
        </>
      ),
    },
    { id: 'news', component: <NewsSection data={pages.news} /> },
    {
      id: 'joinCommittee',
      component: <JoinCommitteeSection data={pages.joinCommittee} />,
    },
    { id: 'access', component: <AccessSection data={pages.access} /> },
    { id: 'contact', component: <ContactSection /> },
    {
      id: 'sponsorship',
      component: <SponsorshipSection data={pages.sponsorship} />,
    },
  ];

  return (
    <>
      {sections.map((section, index) => {
        const componentData = pages[section.id];
        if (section.id !== 'contact' && !componentData) return null;

        const isEven = (index + 1) % 2 === 0;
        return (
          <FadeInComponent key={section.id}>
            <section className={`py-xxl n ${isEven ? 'u-bg-secondary' : ''}`} id={section.id}>
              <div className='l-container u-min-h-screen u-flex-center-column'>
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
