import React from 'react';

import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
