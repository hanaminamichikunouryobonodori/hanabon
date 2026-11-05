'use client';

import Image, { ImageLoaderProps, ImageProps } from 'next/image';

const MICROCMS_IMAGE_HOST = 'images.microcms-assets.io';

const isMicrocmsImage = (src: string) => {
  try {
    return new URL(src).hostname === MICROCMS_IMAGE_HOST;
  } catch {
    return false;
  }
};

/**
 * microCMS の画像は imgix（microCMS 画像API）でリサイズ・WebP 変換して直接配信し、
 * Vercel の画像最適化（/_next/image）を経由させない。
 * Vercel の CDN リクエスト数（無料枠: 月100万件）を節約するため。
 * それ以外（public 配下のローカル画像など）は Next.js 既定の最適化を使う。
 */
const cmsImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const q = quality ?? 75;
  if (isMicrocmsImage(src)) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(q));
    url.searchParams.set('fm', 'webp');
    return url.toString();
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
};

const CmsImage = ({ alt, ...props }: ImageProps) => {
  const { src } = props;
  if (typeof src === 'string' && isMicrocmsImage(src)) {
    return <Image alt={alt} loader={cmsImageLoader} {...props} />;
  }
  return <Image alt={alt} {...props} />;
};

export default CmsImage;
