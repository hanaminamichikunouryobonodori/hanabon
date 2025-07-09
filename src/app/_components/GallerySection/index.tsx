'use client';
import dynamic from 'next/dynamic';

import MaruHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types';

const GallerySection = ({ data }: { data: PageData }) => {
  const ContentRenderer = dynamic(() => import('@/components/common/ContentRenderer'), {
    ssr: false,
  });

  return (
    <div className='l-section' id='gallerySection'>
      <MaruHeadingComponent id='gallery' level={2}>
        {data.title}
      </MaruHeadingComponent>
      <ContentRenderer className='l-container l-container--full' content={data.content} />
    </div>
  );
};

export default GallerySection;
