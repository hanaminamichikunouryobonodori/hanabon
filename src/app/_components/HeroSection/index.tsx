import { PageData } from '@/types';

import styles from './hero.module.scss';
import HeroCarouselComponent from './HeroCarousel';

const HeroSection = ({ data }: { data: PageData }) => {
  const heroGalleryBlock = data.content.find((block) => block.fieldId === 'gallery');
  const logoImageBlock = data.content.find((block) => block.fieldId === 'image');

  if (!heroGalleryBlock || !logoImageBlock?.image_content) {
    return null;
  }

  const heroData = heroGalleryBlock.gallery_content;
  const logoData = logoImageBlock.image_content;

  return (
    <aside className={styles.container} id='heroSection'>
      <h2 id='hero' style={{ display: 'none' }}></h2>
      {heroData.length > 0 && <HeroCarouselComponent heroData={heroData} logoData={logoData} />}
    </aside>
  );
};

export default HeroSection;
