'use client';

import { useState, useEffect, type FC } from 'react';

import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi2';

import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 外部からのclassNameも適用できるようにする
    return <div className={`${className || ''} ${styles.themeSwitchPlaceholder}`} />;
  }

  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <label
      title={isDarkMode ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
      htmlFor='theme-toggle'
      // 外部のクラスとモジュールのクラスを結合
      className={`${className || ''} ${styles.themeSwitch}`}
    >
      <input
        aria-label={isDarkMode ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
        checked={isDarkMode}
        className={styles.themeSwitchInput}
        id='theme-toggle'
        onChange={toggleTheme}
        type='checkbox'
      />
      <span className={styles.themeSwitchSlider}>
        <span className={styles.themeSwitchIcon}>{isDarkMode ? <HiMoon /> : <HiSun />}</span>
      </span>
    </label>
  );
};
