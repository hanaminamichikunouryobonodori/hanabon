import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hanabon.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
        // disallow: '/private/', // もしクロールさせたくない特定のパスがあれば指定
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
