import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: `${process.env.SITE_NAME}`,
  description: '小平市花小金井南町で毎年催されているお祭りです',
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
      },
    ],
  },
};
