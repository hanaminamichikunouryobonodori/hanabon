'use client';
import dynamic from 'next/dynamic';

import { FadeInComponent } from '@/components/animations/FadeIn';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types/microCMS';

const Gallery = ({ data }: { data: PageData['gallery'] }) => {
  const ContentRenderer = dynamic(() => import('@/components/common/ContentRenderer'), {
    ssr: false,
  });

  return (
    <FadeInComponent>
      <article className='l-section' id='gallery'>
        <MinchoHeadingComponent level={2}>{data.title}</MinchoHeadingComponent>
        <ContentRenderer className='l-container l-container--full' content={data.content} />
      </article>
    </FadeInComponent>
  );
};

export default Gallery;
