'use client';

import { useState, useEffect, type FC, Dispatch, SetStateAction } from 'react';

import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi2';

import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className, setIsOpen }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className || ''} ${styles.themeSwitchPlaceholder}`} />;
  }

  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <label
      className={`${className || ''} ${styles.themeSwitch}`}
      htmlFor='theme-toggle'
      title={isDarkMode ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
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
