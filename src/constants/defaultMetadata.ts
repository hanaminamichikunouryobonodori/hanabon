import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: `${process.env.SITE_NAME} | 小平市花小金井南町のお祭り`,
  description: '小平市花小金井南町で毎年催されているお祭りです',
  keywords: [
    '花南地区納涼盆踊り',
    '小平市',
    '花小金井',
    '花小金井南町',
    'お祭り',
    '盆踊り',
    '納涼盆踊り',
    'バンドパフォーマンス',
    'ライブ',
    'よさこい',
    '納涼祭',
    '花小金井南市民広場',
    '花小金井南公民館',
    '花小金井南口',
  ],
  twitter: {
    card: 'summary_large_image',
    images: `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP.png`,
  },
  icons: [
    {
      type: 'image/svg+xml',
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/icon.ico`,
    },
  ],
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_DOMAIN,
    title: '花南地区納涼盆踊り',
    description: '小平市花小金井南町で毎年催されているお祭りです',
    siteName: '花南地区納涼盆踊り',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/hanabonOGP.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
