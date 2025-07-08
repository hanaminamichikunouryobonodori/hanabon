'use client';

import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';
import { menuItems } from '@/libs/navigation';

import styles from './header.module.scss';

const HeaderNav = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuList = menuItems
    .filter((item) => item.to !== 'program')
    .filter((item) => item.to !== 'joinCommittee')
    .filter((item) => item.to !== 'sponsorship')
    .map((item) => (
      <li key={item.to}>
        {item.to === 'news' ? (
          // 'news'専用の通常のリンク
          <Link className={styles.navLink} href='/news' onClick={closeMenu}>
            {item.label}
          </Link>
        ) : isHomePage ? (
          // ホームページ表示時のアンカーリンク
          <ScrollLink
            activeClass={styles.active}
            className={styles.navLink}
            duration={500}
            offset={-80}
            onClick={closeMenu}
            smooth={true}
            spy={true}
            to={item.to}
          >
            {item.label}
          </ScrollLink>
        ) : (
          // 他のページ表示時のホームページへのアンカーリンク
          <Link className={styles.navLink} href={`/#${item.to}`} onClick={closeMenu}>
            {item.label}
          </Link>
        )}
      </li>
    ));

  const logoImage = (
    <Image
      alt='花南地区納涼盆踊り'
      className={styles.blurredLogo}
      height={30}
      priority
      src='/images/hanabonLogo.png'
      width={144}
    />
  );

  return (
    <>
      <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
        {/* ハンバーガーボタン */}
        <button aria-label='メニューを開閉する' className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* ナビゲーションリスト */}
        <ul className={styles.navList}>
          {isHomePage ? (
            <ScrollLink
              activeClass={styles.active}
              className={styles.navLink}
              duration={500}
              offset={-80}
              smooth={true}
              spy={true}
              to='top'
            >
              {logoImage}
            </ScrollLink>
          ) : (
            <Link href='/'>{logoImage}</Link>
          )}
          {menuList}
          <li>
            <ThemeSwitcher className={styles.navLink} onClick={closeMenu} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNav;
