'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FadeInComponent = ({ children, className }: Props) => {
  const { ref, inView } = useInView({
    rootMargin: '-30%',
    triggerOnce: true,
  });

  return (
    <div className={`u-fade-in-on-scroll ${className} ${inView ? 'is-visible' : ''}`} ref={ref}>
      {children}
    </div>
  );
};
