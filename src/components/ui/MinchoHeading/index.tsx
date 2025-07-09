import React, { JSX } from 'react';

// コンポーネントが受け取るPropsの型定義
interface MinchoHeadingProps {
  /** 見出しレベル (1はh1, 2はh2...) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** 表示するテキストや要素 */
  children: React.ReactNode;
  /** 外部から追加するCSSクラス */
  className?: string;
  id?: string;
}

const MinchoHeadingComponent: React.FC<MinchoHeadingProps> = ({
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

export default MinchoHeadingComponent;
