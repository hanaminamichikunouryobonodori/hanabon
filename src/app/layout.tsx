import '@/styles/main.scss';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AnchorLinkHandler } from '@/components/utils/AnchorLinkHandler';
import { defaultMetadata } from '@/constants/defaultMetadata';
import { LightboxProvider } from '@/contexts/LightboxContext';
import { getTheme } from '@/libs/microCMS';

export const revalidate = 3600;

export type Props = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === 'production';

// フォントは Google Fonts から直接配信する（Vercel の CDN リクエスト数を節約するため）。
// next/font だと日本語フォントの分割ファイルを数百件 Vercel から配信してしまう。
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;700;900&family=Zen+Maru+Gothic:wght@700;900&display=swap';

export default async function RootLayout({ children }: Props) {
  const theme = await getTheme();
  const { mainColor, subColor } = theme;
  const { isEnabled } = await draftMode();

  return (
    <html lang='ja' suppressHydrationWarning>
      <head>
        <link href='https://fonts.googleapis.com' rel='preconnect' />
        <link crossOrigin='' href='https://fonts.gstatic.com' rel='preconnect' />
        <link href={GOOGLE_FONTS_URL} rel='stylesheet' />
      </head>
      <body id='top'>
        <ThemeProvider>
          <LightboxProvider>
            <Header />
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
                  prefetch={false}
                  style={{ color: 'cyan', textDecoration: 'underline' }}
                >
                  プレビューを終了
                </Link>
              </div>
            )}
            <Footer />
          </LightboxProvider>
        </ThemeProvider>
        <AnchorLinkHandler />
      </body>
      {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? 'G-QSRVNZL9CF'} />}
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  initialScale: 1,
  width: 'device-width',
};

export async function generateMetadata(): Promise<Metadata> {
  const theme = await getTheme();
  const ogpUrl = theme.ogpImage?.url ?? `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP2026.png`;

  return {
    ...defaultMetadata,
    twitter: {
      ...defaultMetadata.twitter,
      images: ogpUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      images: [{ url: ogpUrl, width: 1200, height: 630 }],
    },
  };
}
