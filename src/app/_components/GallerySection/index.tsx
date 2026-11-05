'use client';
import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

const GallerySection = ({ data }: { data: PageData }) => {
  return (
    <FadeInComponent>
      <div className='l-container l-section' id='gallerySection' style={{ overflowX: 'hidden' }}>
        <MaruHeadingComponent id='gallery' level={2}>
          {data.title}
        </MaruHeadingComponent>
        <ContentRenderer className='l-container l-container--full' content={data.content} />
      </div>
    </FadeInComponent>
  );
};

export default GallerySection;
