import React from 'react';

import { FadeInComponent } from '@/components/animations/FadeIn';
import MaruHeadingComponent, { MaruHeadingProps } from '@/components/ui/MaruHeading';

interface SectionProps {
  id: string;
  title?: string;
  headingLevel?: MaruHeadingProps['level'];
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  useFadeIn?: boolean;
}

const HomeSection = ({
  id,
  title,
  headingLevel = 2,
  children,
  as: Component = 'section',
  className = '',
  useFadeIn = true,
}: SectionProps) => {
  const content = (
    <Component className={className} id={id}>
      {title && (
        <MaruHeadingComponent id={id} level={headingLevel}>
          {title}
        </MaruHeadingComponent>
      )}
      {children}
    </Component>
  );

  return useFadeIn ? <FadeInComponent>{content}</FadeInComponent> : content;
};

export default HomeSection;
