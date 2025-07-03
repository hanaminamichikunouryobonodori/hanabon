import '@/styles/main.scss';

import type { ReactNode } from 'react';

import type { Metadata, NextPage, Viewport } from 'next';
import { Murecho, Zen_Old_Mincho } from 'next/font/google';

import { defaultMetadata } from '@/constants/defaultMetadata';
import { client } from '@/libs/client';
import { Theme } from '@/types/microCMS/theme-response';

export const revalidate = 180;

export type Props = {
  children: ReactNode;
};
export const murecho = Murecho({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-murecho',
});

export const ZenOldMincho = Zen_Old_Mincho({
  weight: '900',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-old-mincho',
});

async function getTheme(): Promise<Theme> {
  try {
    const themeData = await client.getObject<Theme>({
      endpoint: 'theme',
    });
    return themeData;
  } catch (error) {
    console.error('テーマが取得できませんでした:', error);
    return {
      mainColor: '#0d4396',
      subColor: '#f19bc0',
    };
  }
}

const RootLayout: NextPage<Props> = async ({ children }) => {
  const theme = await getTheme();
  const { mainColor, subColor } = theme;

  return (
    <html lang='ja'>
      <head>
        <style>{`:root{--main-color-base:${mainColor};--sub-color-base:${subColor}}`}</style>
      </head>
      <body className={`${murecho.variable} ${ZenOldMincho.variable}`} id='outerContainer'>
        {children}
      </body>
    </html>
  );
};
export default RootLayout;

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  initialScale: 1,
  width: 'device-width',
};

export const metadata: Metadata = defaultMetadata;
