import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
  webpack: (config: {
    module: {
      rules: {
        test: RegExp;
        use: { loader: string; options: { limit: number } }[];
      }[];
    };
  }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};

module.exports = nextConfig;
