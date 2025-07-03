'use client';
import React from 'react';

import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './imageCarousel.module.scss';

type Photo = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  photos: Photo[];
  aspect?: string;
};

export default function ImageCarousel({ photos, aspect }: Props) {
  const isPoster = aspect === '1:1.414（A4/ポスター）';
  const is4_3 = aspect === '4-3';

  return (
    <div>
      <Swiper
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
          <SwiperSlide key={index}>
            <div
              className={`${styles.slideContent} ${isPoster ? styles['slideContent--poster'] : ''} ${is4_3 ? styles['slideContent--4-3'] : ''}`}
            >
              <Image
                alt={`ギャラリー画像 ${index + 1}`}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                src={photo.url}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
