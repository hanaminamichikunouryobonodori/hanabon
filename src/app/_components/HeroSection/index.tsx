import { PageData } from '@/types';

import styles from './hero.module.scss';
import HeroCarouselComponent from './HeroCarousel';

const HeroSection = ({ data }: { data: PageData }) => {
  let imageUrls: string[] = [];
  let logoImageData;

  const heroImagesBlock = data.content.find((block) => block.fieldId === 'gallery');

  if (heroImagesBlock && heroImagesBlock.fieldId === 'gallery' && heroImagesBlock.gallery_content) {
    imageUrls = heroImagesBlock.gallery_content.map((image) => image.url);
  }

  const logoImageBlock = data.content.find((block) => block.fieldId === 'image');

  if (logoImageBlock && logoImageBlock.fieldId === 'image') {
    logoImageData = logoImageBlock.image_content;
  }

  return (
    <aside className={styles.container} id='hero'>
      {imageUrls.length > 0 && (
        <HeroCarouselComponent backgroundImageUrls={imageUrls} logoImageData={logoImageData} />
      )}
    </aside>
  );
};

export default HeroSection;
