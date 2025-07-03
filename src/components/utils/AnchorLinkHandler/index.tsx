'use client';

import { useEffect } from 'react';
import { scroller } from 'react-scroll'; // react-scrollのscrollerをインポート

import { usePathname } from 'next/navigation';

export const AnchorLinkHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (pathname === '/' && hash) {
      const targetSection = hash.substring(1);

      window.scrollTo({ top: 0, behavior: 'auto' });

      const timer = setTimeout(() => {
        scroller.scrollTo(targetSection, {
          duration: 1000,
          smooth: 'easeInOutQuad',
          offset: -100,
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
};
