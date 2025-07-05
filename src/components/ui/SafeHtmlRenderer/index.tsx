'use client';
import React, { useContext } from 'react';

import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

import eventDateStyles from '@/app/_components/EventDateSection/eventDate.module.scss';
import { LightboxContext } from '@/contexts/LightboxContext';

import style from './microCMS.module.scss';

interface Props {
  htmlContent: string;
  className?: string;
  id?: string;
}

const SafeHtmlRenderer: React.FC<Props> = ({ htmlContent, className, id }) => {
  const { openLightbox } = useContext(LightboxContext);
  if (!htmlContent) {
    return null;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) return;

      if (domNode.name === 'a') {
        const { href, target } = domNode.attribs;
        if (target === '_blank') {
          return (
            <a href={href} rel='noopener noreferrer' target='_blank'>
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        }
        if (href) {
          return <Link href={href}>{domToReact(domNode.children as DOMNode[], options)}</Link>;
        }
      }
      if (domNode.name === 'img') {
        const { src, alt, width, height } = domNode.attribs;
        const parent = domNode.parent;
        const isLinked = parent instanceof Element && parent.name === 'a';

        const imageComponent = (
          <Image
            alt={alt || ''}
            height={Number(height) || 300}
            src={src || ''}
            style={{ width: '100%', height: 'auto' }}
            width={Number(width) || 400}
          />
        );

        if (!isLinked) {
          return (
            <button
              aria-label='画像を拡大表示'
              className='c-reset-button'
              onClick={() => openLightbox([{ src: src || '' }])}
            >
              {imageComponent}
            </button>
          );
        }

        // リンク付き画像ならそのまま表示
        return imageComponent;
      }
      if (domNode.name === 'table') {
        return (
          <div className='table-wrapper'>
            <table {...domNode.attribs}>{domToReact(domNode.children as DOMNode[], options)}</table>
          </div>
        );
      }
    },
  };

  if (id === 'event-date-schedule') {
    return (
      <div
        className={`${style.container} ${className ? className : ''} ${eventDateStyles.schedule}`}
      >
        {parse(htmlContent, options)}
      </div>
    );
  } else if (id === 'event-date-program') {
    return (
      <div
        className={`${style.container} ${className ? className : ''} ${eventDateStyles.program}`}
      >
        {parse(htmlContent, options)}
      </div>
    );
  }

  return (
    <div className={`${style.container} ${className ? className : ''}`}>
      {parse(htmlContent, options)}
    </div>
  );
};

export default SafeHtmlRenderer;
