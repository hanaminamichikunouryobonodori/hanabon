'use client';
import React, { useEffect, useState } from 'react';

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
  const [showCarousel, setShowCarousel] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!logoImageData) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
      {showCarousel ? (
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
      ) : (
        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            <Image
              alt={`Hero Background`}
              className={styles.carouselImage}
              fill
              sizes='100vw'
              src={backgroundImageUrls[0]}
              style={{ objectFit: 'cover', scale: '1.3' }}
            />
          </div>
        </div>
      )}
      <Image
        alt='花南地区納涼盆踊り'
        className={styles.heroLogoImage}
        height={logoImageData.height}
        priority
        src={logoImageData.url}
        style={{ objectFit: 'cover' }}
        width={logoImageData.width}
      />
    </div>
  );
};

export default HeroCarouselComponent;
