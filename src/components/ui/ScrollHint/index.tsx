import React, { useEffect, useRef, ReactNode } from 'react';

import 'scroll-hint/css/scroll-hint.css';

interface ScrollHintProps {
  children: ReactNode;
  className?: string;
  options?: object;
}

/**
 * 横スクロールできる領域。タッチ端末のときだけ、表示後に「スクロールできます」のヒントを付ける。
 * HTML はどの端末でも同じものを出すので、ハイドレーションの不一致や表示のずれが起きない。
 */
const ScrollHintWrapper: React.FC<ScrollHintProps> = ({ children, className, options }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let cancelled = false;
    import('scroll-hint').then(({ default: ScrollHint }) => {
      if (cancelled) return;
      new ScrollHint(el, {
        i18n: {
          scrollable: 'スクロールできます',
        },
        ...options,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [options]);

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ScrollHintWrapper;
