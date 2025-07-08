'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';

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
}: {
  heroData: ImageProps[];
  logoData: ImageProps;
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!heroData || heroData.length === 0 || !logoData || !logoData.url) {
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
          {heroData.map((data, index) => (
            <SwiperSlide key={index}>
              <Image
                alt={`Hero Background ${index + 1}`}
                className={styles.carouselImage}
                fill
                priority={false}
                sizes='100vw'
                src={data.url}
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
              priority
              sizes='100vw'
              src={heroData[0].url}
              style={{ objectFit: 'cover', scale: '1.3' }}
            />
          </div>
        </div>
      )}
      <Image
        alt='花南地区納涼盆踊り'
        className={styles.heroLogoImage}
        height={logoData.height}
        priority
        src={logoData.url}
        style={{ objectFit: 'cover' }}
        width={logoData.width}
      />
    </div>
  );
};

export default HeroCarouselComponent;
