import React from 'react';

import MaruHeadingComponent from '@/components/ui/MaruHeading';

import styles from './PageHeader.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageHeader = ({ children, className }: Props) => {
  return (
    <header className={`${styles.header} ${className} py-xl mb-lg`}>
      <div className='l-container px-lg'>
        <MaruHeadingComponent className={styles['header__title']} level={1}>
          {children}
        </MaruHeadingComponent>
      </div>
    </header>
  );
};

export default PageHeader;
