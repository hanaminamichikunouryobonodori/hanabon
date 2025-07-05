'use client';

import { useState, useEffect, type FC } from 'react';

import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi2';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleThemeChange = (newTheme: string) => {
    document.body.classList.add('theme-is-changing');

    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => {
        document.body.classList.remove('theme-is-changing');
      }, 50);
    }, 200);
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    handleThemeChange(newTheme);
  };

  if (!mounted) {
    return <div className={className} />;
  }

  return (
    <button
      aria-label={
        resolvedTheme === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える'
      }
      className={`${className} c-button c-button--icon`}
      onClick={toggleTheme}
      title={resolvedTheme === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
    >
      {resolvedTheme === 'dark' ? <HiMoon /> : <HiSun />}
    </button>
  );
};
