import React from 'react';

import { QRCodeSVG } from 'qrcode.react';

import styles from './QrCodeForMobile.module.scss';

const QrCodeForMobile: React.FC = () => {
  const url = process.env.NEXT_PUBLIC_DOMAIN || 'https://hanabon.vercel.app';

  if (!url) {
    return null;
  }

  return (
    <div className={styles.qrCodeContainer}>
      <h4 className={styles.qrCodeTitle}>スマホで見る</h4>
      <QRCodeSVG
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'L'}
        marginSize={2}
        size={140}
        value={url}
      />
    </div>
  );
};

export default QrCodeForMobile;
