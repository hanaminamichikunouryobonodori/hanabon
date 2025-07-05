'use client';

import { scroller } from 'react-scroll';

import { HiChevronDoubleUp } from 'react-icons/hi2';

import styles from './ScrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    scroller.scrollTo('top', {
      duration: 800,
      smooth: 'easeInOutQuad',
      offset: -100,
    });
  };

  return (
    <button aria-label='ページのトップに戻る' className={styles.button} onClick={scrollToTop}>
      <HiChevronDoubleUp />
    </button>
  );
};

export default ScrollToTopButton;
