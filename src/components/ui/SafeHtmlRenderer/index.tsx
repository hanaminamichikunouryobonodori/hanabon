'use client';
import React, { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link as ScrollLink } from 'react-scroll';

import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import eventDateStyles from '@/app/_components/EventDateSection/eventDate.module.scss';
import { LightboxContext } from '@/contexts/LightboxContext';

import ScrollHintWrapper from '../ScrollHint';

import style from './microCMS.module.scss';

interface Props {
  htmlContent: string;
  className?: string;
  id?: string;
}

const SafeHtmlRenderer: React.FC<Props> = ({ htmlContent, className, id }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openLightbox } = useContext(LightboxContext);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!htmlContent) {
    return null;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'text') {
        const text = domNode.data;
        const parts = text.split(/(。|、)/g);

        return (
          <>
            {parts.map((part, index) => {
              if (part === '。' || part === '、') {
                return (
                  <React.Fragment key={index}>
                    {part}
                    <wbr />
                  </React.Fragment>
                );
              }
              return part;
            })}
          </>
        );
      }
      if (!(domNode instanceof Element)) return;

      if (domNode.name === 'a') {
        const { href, target } = domNode.attribs;

        if (!href) return <>{domToReact(domNode.children as DOMNode[], options)}</>;

        if (target === '_blank') {
          return (
            <a href={href} rel='noopener noreferrer' target='_blank'>
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        }

        if (href.startsWith('/#')) {
          const targetId = href.substring(2);
          if (pathname === '/') {
            return (
              <ScrollLink
                duration={500}
                offset={-80}
                smooth={true}
                style={{ cursor: 'pointer' }}
                to={targetId}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </ScrollLink>
            );
          } else {
            return (
              <a
                onClick={() => {
                  sessionStorage.setItem('scrollTo', targetId);
                  router.push('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </a>
            );
          }
        }
        return <Link href={href}>{domToReact(domNode.children as DOMNode[], options)}</Link>;
      }
      if (domNode.name === 'img') {
        const { src, alt, width, height } = domNode.attribs;
        const parent = domNode.parent;
        const isLinked = parent instanceof Element && parent.name === 'a';

        const imageComponent = (
          <Image
            alt={alt || ''}
            className='u-responsive-image u-image-rounded-md'
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
        const tableElement = (
          <table {...domNode.attribs}>{domToReact(domNode.children as DOMNode[], options)}</table>
        );
        if (hasMounted && isMobile) {
          return <ScrollHintWrapper>{tableElement}</ScrollHintWrapper>;
        }
        return <div className='table-wrapper'>{tableElement}</div>;
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
