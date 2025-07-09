import React from 'react';

import styles from './PageHeader.module.scss';
import MaruHeadingComponent from '@/components/ui/MinchoHeading';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageHeader = ({ children, className }: Props) => {
  return (
    <header className={`${styles.header} ${className} py-xl mb-lg`}>
      <div className='l-container px-lg'>
        <MaruHeadingComponent level={1} className={styles['header__title']}>
          {children}
        </MaruHeadingComponent>
      </div>
    </header>
  );
};

export default PageHeader;
