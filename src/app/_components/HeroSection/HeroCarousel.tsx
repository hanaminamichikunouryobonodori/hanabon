'use client';
import React from 'react';

import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';

import Image from '@/components/ui/CmsImage';
import Lanterns from '@/components/ui/Lanterns';

import styles from './hero.module.scss';

type ImageProps = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

const HeroCarouselComponent = ({
  heroData,
  logoData,
  firstBlurDataUrl,
}: {
  heroData: ImageProps[];
  logoData: ImageProps;
  /** 1枚目の画像が届くまで表示する、ぼかした画像（data URI） */
  firstBlurDataUrl?: string;
}) => {
  if (!heroData || heroData.length === 0 || !logoData || !logoData.url) {
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
        speed={2000}
      >
        {heroData.map((data, index) => (
          <SwiperSlide key={index}>
            <Image
              alt={`Hero Background ${index + 1}`}
              blurDataURL={index === 0 ? firstBlurDataUrl : undefined}
              className={styles.carouselImage}
              fill
              placeholder={index === 0 && firstBlurDataUrl ? 'blur' : 'empty'}
              priority={index === 0}
              sizes='100vw'
              src={data.url}
              style={{ objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Lanterns />
      <Image
        alt='花南地区納涼盆踊り'
        className={styles.heroLogoImage}
        height={logoData.height}
        priority
        src={logoData.url}
        width={logoData.width}
      />
    </div>
  );
};

export default HeroCarouselComponent;
