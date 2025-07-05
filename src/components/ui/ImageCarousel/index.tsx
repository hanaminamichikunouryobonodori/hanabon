'use client';
import React, { useContext } from 'react';

import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { LightboxContext } from '@/contexts/LightboxContext';

import styles from './imageCarousel.module.scss';

type Photo = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

type Props = {
  photos: Photo[];
  aspect?: string;
};

export default function ImageCarousel({ photos, aspect }: Props) {
  const { openLightbox } = useContext(LightboxContext);

  const isPoster = aspect === '1:1.414（A4/ポスター）';
  const is4_3 = aspect === '4-3';

  return (
    <>
      <Swiper
        autoHeight={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className={styles.carousel}
        loop={true}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={30}
        style={
          {
            '--swiper-navigation-color': 'var(--foreground)',
            '--swiper-pagination-color': 'var(--foreground)',
          } as React.CSSProperties
        }
      >
        {photos.map((photo, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              openLightbox(
                photos.map((p) => ({ src: p.url })),
                index
              );
            }}
          >
            <div
              className={`${styles.slideContent} ${isPoster ? styles['slideContent--poster'] : ''} ${is4_3 ? styles['slideContent--4-3'] : ''} u-cursor-pointer`}
            >
              <Image
                alt={photo.alt ? photo.alt : `ギャラリー画像 ${index + 1}`}
                fill
                priority={index === 0}
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                src={photo.url}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
