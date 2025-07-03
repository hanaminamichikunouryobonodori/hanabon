'use client';

import { JSX } from 'react';
import { Element } from 'react-scroll';

import AboutSection from '@/app/_components/AboutSection';
import AccessSection from '@/app/_components/AccessSection';
import ContactSection from '@/app/_components/ContactSection';
import EventDateSection from '@/app/_components/EventDateSection';
import GallerySection from '@/app/_components/GallerySection';
import JoinCommitteeSection from '@/app/_components/JoinCommitteeSection';
import NewsSection from '@/app/_components/NewsSection';
import SponsorshipSection from '@/app/_components/SponsorshipSection';
import { FadeInComponent } from '@/components/animations/FadeIn';
import { HomePageProps } from '@/types';

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
