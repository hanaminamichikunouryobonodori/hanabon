import React, { useState } from 'react';

import SafeHtmlRenderer from '@/components/ui/SafeHtmlRenderer';

interface Props {
  index: number;
  heading: string;
  content: string;
  className: string;
}

const AccordionComponent = ({ index, heading, content, className }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
    e.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <details className={className} open={openIndex === index}>
      <summary onClick={(e) => handleToggle(e, index)}>{heading}</summary>
      <SafeHtmlRenderer htmlContent={content} />
    </details>
  );
};

export default AccordionComponent;
