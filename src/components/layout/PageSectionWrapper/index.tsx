import React from 'react';

import { FadeInComponent } from '@/components/animations/FadeIn';

interface PageSectionWrapperProps {
  id: string;
  isEven: boolean;
  children: React.ReactNode;
  skipFadeIn?: boolean;
}

const PageSectionWrapper = ({
  id,
  isEven,
  children,
  skipFadeIn = false,
}: PageSectionWrapperProps) => {
  const component = (
    <section className={`py-3xl ${isEven ? 'u-bg-secondary' : ''}`}>
      <div className='l-container u-min-h-screen u-flex-center-column' id={`${id}Section`}>
        {children}
      </div>
    </section>
  );

  if (skipFadeIn) {
    return component;
  }

  return <FadeInComponent>{component}</FadeInComponent>;
};

export default PageSectionWrapper;
