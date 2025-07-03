import React from 'react';

import styles from './PageHeader.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageHeader = ({ children, className }: Props) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        <h1 className={styles['header__title']}>{children}</h1>
      </div>
    </header>
  );
};

export default PageHeader;
