import React, { JSX } from 'react';

// コンポーネントが受け取るPropsの型定義
export interface MaruHeadingProps {
  /** 見出しレベル (1はh1, 2はh2...) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const MaruHeadingComponent: React.FC<MaruHeadingProps> = ({
  level,
  children,
  className = '',
  id,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const combinedClassName = `c-heading c-heading--h${level} ${className}`.trim();

  return (
    <Tag className={combinedClassName} id={id ? id : ''}>
      {children}
    </Tag>
  );
};

export default MaruHeadingComponent;
