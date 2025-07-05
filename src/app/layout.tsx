import '@/styles/main.scss';
import type { ReactNode } from 'react';

import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, NextPage, Viewport } from 'next';
import { Montserrat, Zen_Kaku_Gothic_New, Zen_Old_Mincho } from 'next/font/google';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AnchorLinkHandler } from '@/components/utils/AnchorLinkHandler';
import { defaultMetadata } from '@/constants/defaultMetadata';
import { LightboxProvider } from '@/contexts/LightboxContext';
import { client } from '@/libs/client';
import { Theme } from '@/types/microCMS/theme-response';

export const revalidate = 180;

export type Props = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === 'production';

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const ZenKakuGothic = Zen_Kaku_Gothic_New({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-kaku-gothic-new',
});

const ZenOldMincho = Zen_Old_Mincho({
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
  const { isEnabled } = await draftMode();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) {
    throw new Error('GTM_ID is not defined');
  }

  return (
    <html lang='ja' suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${ZenKakuGothic.variable} ${ZenOldMincho.variable}`}
        id='top'
      >
        <ThemeProvider>
          <LightboxProvider>
            <style>{`:root{--main-color-base:${mainColor};--sub-color-base:${subColor}}`}</style>
            {children}
            {isEnabled && (
              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'black',
                  color: 'white',
                  padding: '1rem',
                  textAlign: 'center',
                  zIndex: 9999,
                }}
              >
                現在プレビューモードで表示しています。{' '}
                <Link
                  href='/api/disable-preview'
                  style={{ color: 'cyan', textDecoration: 'underline' }}
                >
                  プレビューを終了
                </Link>
              </div>
            )}
          </LightboxProvider>
        </ThemeProvider>
        <SpeedInsights />
        <AnchorLinkHandler />
      </body>
      {isProduction && gtmId && <GoogleTagManager gtmId={gtmId as string} />}
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
