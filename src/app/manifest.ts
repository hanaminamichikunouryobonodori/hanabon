import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '花南地区納涼盆踊り',
    short_name: '花南盆踊り',
    description: '花南地区納涼盆踊りの公式サイトです。',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#ededed',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
