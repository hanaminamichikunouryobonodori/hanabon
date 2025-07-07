'use client';
import React from 'react';

import Image from 'next/image';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';

import styles from './hero.module.scss';

interface CarouselProps {
  backgroundImageUrls: string[];
  logoImageData: { url: string; width: number; height: number } | undefined;
}

const HeroCarouselComponent: React.FC<CarouselProps> = ({ backgroundImageUrls, logoImageData }) => {
  if (!logoImageData) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className={styles.carousel}
        effect='fade'
        loop={true}
        modules={[Autoplay, EffectFade]}
        speed={1}
      >
        {backgroundImageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <Image
              alt={`Hero Background ${index + 1}`}
              className={styles.carouselImage}
              fill
              priority={index === 0}
              sizes='100vw'
              src={imageUrl}
              style={{ objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Image
        alt='花南地区納涼盆踊り'
        className={styles.heroLogoImage}
        height={logoImageData.height}
        priority
        src={logoImageData.url}
        width={logoImageData.width}
      />
    </div>
  );
};

export default HeroCarouselComponent;
