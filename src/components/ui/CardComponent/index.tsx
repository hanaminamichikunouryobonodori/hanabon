'use client';

import Image from 'next/image';
import Link from 'next/link';

import { containsHtml } from '@/libs/utils';

import SafeHtmlRenderer from '../SafeHtmlRenderer';

interface CardDataProps {
  title: string;
  image: { url: string; width?: number; height?: number; alt?: string };
  description: string;
  link?: string;
  buttonText?: string;
}

const CardComponent = (cardData: CardDataProps) => {
  const cardContent = (
    <div className='c-card'>
      <Image
        alt={cardData.image.alt || cardData.title}
        className='c-card__image'
        height={cardData.image.height || 400}
        src={cardData.image.url}
        width={cardData.image.width || 600}
      />
      <div className='c-card__body'>
        <h3 className='c-card__title'>{cardData.title}</h3>
        {cardData.description &&
          (containsHtml(cardData.description) ? (
            <SafeHtmlRenderer className='c-card__description' htmlContent={cardData.description} />
          ) : (
            <p className='c-card__description'>{cardData.description}</p>
          ))}
        {cardData.buttonText && (
          <div className='c-card__tags'>
            {cardData.buttonText
              .split(',')
              .map((text) => text.trim())
              .filter((text) => text)
              .map((tag, index) => (
                <span key={index} className='c-card__tag'>
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
  // linkがある場合はLinkタグでラップ、ない場合はdivでラップ
  if (cardData.link) {
    return (
      <Link className='c-card__link' href={cardData.link}>
        {cardContent}
      </Link>
    );
  }

  return <>{cardContent}</>;
};

export default CardComponent;
