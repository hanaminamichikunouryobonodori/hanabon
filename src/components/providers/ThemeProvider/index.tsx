'use client';

import { FC } from 'react';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return (
    <NextThemesProvider attribute='data-theme' defaultTheme='system' enableSystem {...props}>
      {props.children}
    </NextThemesProvider>
  );
};
