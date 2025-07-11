'use client';
import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import QrCodeForMobile from '@/components/ui/QrCodeForMobile';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { menuItems, footerLinks } from '@/libs/navigation';

import styles from './footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  return (
    <footer className={styles.root}>
      <div className={`${styles.container} l-grid l-grid--grid-auto-fit`}>
        <div className={styles.sitemap}>
          <div className={styles.contentWrapper}>
            <h4 className={styles.sitemapTitle}>ホーム</h4>
            <ul className={styles.sitemapList}>
              {menuItems.map((item) => (
                <li key={item.to}>
                  {isHomePage ? (
                    <ScrollLink
                      className={styles.sitemapLink}
                      duration={800}
                      offset={-100}
                      smooth={true}
                      style={{ cursor: 'pointer' }}
                      to={item.to}
                    >
                      {item.label === 'お知らせ' ? '最新情報' : item.label}
                    </ScrollLink>
                  ) : (
                    <a
                      className={styles.sitemapLink}
                      onClick={() => {
                        sessionStorage.setItem('scrollTo', item.to);
                        router.push('/');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.label === 'お知らせ' ? '最新情報' : item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.newsCategories}>
          <div className={styles.contentWrapper}>
            <h4 className={styles.sitemapTitle}>記事</h4>
            <ul className={styles.sitemapList}>
              <li>
                <Link className={styles.sitemapLink} href='/news'>
                  お知らせ一覧
                </Link>
              </li>
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
              <Link href='/sitemap.xml' prefetch={false}>
                サイトマップ
              </Link>
            </ul>
            <QrCodeForMobile />
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          Copyright © 2019 - {year} <Link href=''>花南地区納涼盆踊り</Link> – by
          花南地区納涼盆踊り実行委員会
        </p>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};
