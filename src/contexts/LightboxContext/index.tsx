'use client';

import { createContext, useState, type ReactNode, useCallback } from 'react';

import Lightbox, { Slide } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

type LightboxContextType = {
  openLightbox: (slides: Slide[], index?: number) => void;
};

export const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
});

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);

  const openLightbox = useCallback((slidesToShow: Slide[], newIndex: number = 0) => {
    setSlides(slidesToShow);
    setIndex(newIndex);
    setOpen(true);
  }, []);

  const value = { openLightbox };

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox
        animation={{
          fade: 500,
          swipe: 500,
          easing: { fade: 'ease-out', swipe: 'ease-out' },
        }}
        carousel={{ finite: slides.length <= 1 }}
        className='u-fade-in'
        close={() => setOpen(false)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={index}
        open={open}
        plugins={[Zoom]}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      />
    </LightboxContext.Provider>
  );
};
