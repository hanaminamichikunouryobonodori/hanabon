import Link from 'next/link';

import { menuItems, footerLinks, newsCategories } from '@/libs/navigation';

import styles from './footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={`u-bg-secondary ${styles.root}`}>
      <div className={`${styles.container} l-grid l-grid--grid-auto-fit`}>
        <div className={styles.sitemap}>
          <div className={styles.contentWrapper}>
            <h4 className={styles.sitemapTitle}>メニュー</h4>
            <ul className={styles.sitemapList}>
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link className={styles.sitemapLink} href={`/#${item.to}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.newsCategories}>
          <div className={styles.contentWrapper}>
            <h4 className={styles.sitemapTitle}>記事</h4>
            <ul className={styles.sitemapList}>
              {newsCategories.map((link) => (
                <li key={link.to}>
                  <Link className={styles.sitemapLink} href={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.otherLinks}>
          <div className={styles.contentWrapper}>
            <h4 className={styles.sitemapTitle}>その他</h4>
            <ul className={styles.sitemapList}>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link className={styles.sitemapLink} href={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          Copyright © 2019 - {year} <Link href=''>花南地区納涼盆踊り</Link> – by
          花南地区納涼盆踊り実行委員会
        </p>
      </div>
    </footer>
  );
};
