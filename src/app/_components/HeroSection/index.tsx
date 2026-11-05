import { getBlurDataUrl } from '@/libs/blurPlaceholder';
import { PageData } from '@/types';

import styles from './hero.module.scss';
import HeroCarouselComponent from './HeroCarousel';

const HeroSection = async ({ data }: { data: PageData }) => {
  const heroGalleryBlock = data.content.find((block) => block.fieldId === 'gallery');
  const logoImageBlock = data.content.find((block) => block.fieldId === 'image');

  if (!heroGalleryBlock || !logoImageBlock?.image_content) {
    return null;
  }

  const heroData = heroGalleryBlock.gallery_content;
  const logoData = logoImageBlock.image_content;
  // 1枚目のヒーロー画像は、届くまでのあいだ、ぼかした画像を表示する
  const firstBlurDataUrl = heroData[0] ? await getBlurDataUrl(heroData[0].url) : undefined;

  return (
    <aside className={styles.container} id='heroSection'>
      <h2 id='hero' style={{ display: 'none' }}></h2>
      {heroData.length > 0 && (
        <HeroCarouselComponent
          firstBlurDataUrl={firstBlurDataUrl}
          heroData={heroData}
          logoData={logoData}
        />
      )}
    </aside>
  );
};

export default HeroSection;
