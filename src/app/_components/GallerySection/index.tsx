'use client';
import dynamic from 'next/dynamic';

import { FadeInComponent } from '@/components/animations/FadeIn';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

const GallerySection = ({ data }: { data: PageData }) => {
  const ContentRenderer = dynamic(() => import('@/components/common/ContentRenderer'), {
    ssr: false,
  });

  return (
    <FadeInComponent>
      <div className='l-container l-section' id='gallerySection'>
        <MaruHeadingComponent id='gallery' level={2}>
          {data.title}
        </MaruHeadingComponent>
        <ContentRenderer className='l-container l-container--full' content={data.content} />
      </div>
    </FadeInComponent>
  );
};

export default GallerySection;
