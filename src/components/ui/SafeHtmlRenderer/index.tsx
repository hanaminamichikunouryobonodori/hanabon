'use client';
import React from 'react';

import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import Link from 'next/link';

import eventDateStyles from '@/app/_components/EventDateSection/eventDate.module.scss';

import style from './microCMS.module.scss';

interface Props {
  htmlContent: string;
  className?: string;
  id?: string;
}

const SafeHtmlRenderer: React.FC<Props> = ({ htmlContent, className, id }) => {
  if (!htmlContent) {
    return null;
  }
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // domNodeがElement型でなければ何もしない
      if (!(domNode instanceof Element)) return;

      // <a>タグの置き換え処理
      if (domNode.name === 'a') {
        const { href, target } = domNode.attribs;

        // target="_blank"を持つ外部リンクは、通常の<a>タグとして扱う
        if (target === '_blank') {
          return (
            <a href={href} rel='noopener noreferrer' target='_blank'>
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        }
        // それ以外のリンクはNext.jsの<Link>コンポーネントに変換
        if (href) {
          return <Link href={href}>{domToReact(domNode.children as DOMNode[], options)}</Link>;
        }
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
