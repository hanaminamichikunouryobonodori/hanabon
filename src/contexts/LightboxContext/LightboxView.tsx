'use client';

import Lightbox, { Slide } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

type Props = {
  open: boolean;
  slides: Slide[];
  index: number;
  close: () => void;
};

/**
 * ライトボックス本体。LightboxProvider から、最初に開かれたときだけ読み込まれる（遅延読み込み）。
 */
const LightboxView = ({ open, slides, index, close }: Props) => (
  <Lightbox
    animation={{
      fade: 500,
      swipe: 500,
      easing: { fade: 'ease-out', swipe: 'ease-out' },
    }}
    carousel={{ finite: slides.length <= 1 }}
    className='u-fade-in'
    close={close}
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
);

export default LightboxView;
