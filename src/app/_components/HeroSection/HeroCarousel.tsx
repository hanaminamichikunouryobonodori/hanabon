'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import styles from './hero.module.scss';

interface CarouselProps {
  backgroundImageUrls: string[];
  logoImageData: { url: string; width: number; height: number } | undefined;
}

const HeroCarouselComponent: React.FC<CarouselProps> = ({ backgroundImageUrls, logoImageData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoadings, setImageLoadings] = useState(
    new Array(backgroundImageUrls.length).fill(false)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % backgroundImageUrls.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [backgroundImageUrls]);

  if (!logoImageData) {
    return null;
  }

  return (
    <div className={styles.carousel}>
      {backgroundImageUrls.map((imageUrl, index) => (
        <div
          className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
          key={`carousel-${index}`}
        >
          <Image
            alt={`Hero ${index + 1}`}
            className={styles.carouselImage}
            fill
            onLoad={() => {
              setImageLoadings((prevState) => {
                const updatedState = [...prevState];
                updatedState[index] = true;
                return updatedState;
              });
            }}
            priority
            sizes='(max-width: var.$breakpoint-md) 100vw, 50vw'
            src={imageUrl}
            style={{
              opacity: imageLoadings[index] ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
          />
        </div>
      ))}
      {imageLoadings.every((isLoaded) => isLoaded) && (
        <Image
          alt='花南地区納涼盆踊り'
          className={styles.heroLogoImage}
          height={logoImageData.height}
          priority
          src={logoImageData.url}
          width={logoImageData.width}
        />
      )}
    </div>
  );
};

export default HeroCarouselComponent;
