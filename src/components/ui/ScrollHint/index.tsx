import React, { useEffect, useRef, ReactNode } from 'react';

import ScrollHint from 'scroll-hint';
import 'scroll-hint/css/scroll-hint.css';

interface ScrollHintProps {
  children: ReactNode;
  options?: object;
}

const ScrollHintWrapper: React.FC<ScrollHintProps> = ({ children, options }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    new ScrollHint(wrapperRef.current, {
      i18n: {
        scrollable: 'スクロールできます',
      },
      ...options,
    });
  }, [options]);

  return (
    <div ref={wrapperRef} style={{ overflowX: 'auto', width: '100%' }}>
      {children}
    </div>
  );
};

export default ScrollHintWrapper;
