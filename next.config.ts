const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
    minimumCacheTTL: 2592000,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              // GA4 / GTM: https://developers.google.com/tag-platform/security/guides/csp
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com www.google-analytics.com maps.googleapis.com; " +
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
              "font-src 'self' fonts.gstatic.com; " +
              "img-src 'self' data: images.microcms-assets.io kb147.web.fc2.com maps.gstatic.com *.googleapis.com *.ggpht.com *.google-analytics.com *.googletagmanager.com; " +
              "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.googleapis.com; " +
              'frame-src https://www.google.com https://maps.google.com;',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
