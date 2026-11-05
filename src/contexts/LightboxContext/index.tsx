'use client';

import { createContext, useState, type ReactNode, useCallback } from 'react';

import dynamic from 'next/dynamic';
import type { Slide } from 'yet-another-react-lightbox';

// ライトボックス本体は、最初に開かれたときに読み込む（最初のページ読み込みを軽くするため）
const LightboxView = dynamic(() => import('./LightboxView'), { ssr: false });

type LightboxContextType = {
  openLightbox: (slides: Slide[], index?: number) => void;
};

export const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
});

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  // 一度開いたら出しっぱなしにする（閉じるアニメーションが途中で切れないように）
  const [hasOpened, setHasOpened] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);

  const openLightbox = useCallback((slidesToShow: Slide[], newIndex: number = 0) => {
    setSlides(slidesToShow);
    setIndex(newIndex);
    setHasOpened(true);
    setOpen(true);
  }, []);

  const value = { openLightbox };

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {hasOpened && (
        <LightboxView close={() => setOpen(false)} index={index} open={open} slides={slides} />
      )}
    </LightboxContext.Provider>
  );
};
