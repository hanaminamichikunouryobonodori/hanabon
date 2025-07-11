'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  children: React.ReactNode;
  className?: string;
  margin?: string;
};

export const FadeInComponent = ({ children, className, margin }: Props) => {
  const rootMargin = margin || '-30%';
  const { ref, inView } = useInView({
    rootMargin: rootMargin,
    triggerOnce: true,
  });

  return (
    <div className={`u-fade-in-on-scroll ${className} ${inView ? 'is-visible' : ''}`} ref={ref}>
      {children}
    </div>
  );
};
