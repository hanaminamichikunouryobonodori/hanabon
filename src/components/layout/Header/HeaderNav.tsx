'use client';

import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';
import { menuItems } from '@/libs/navigation';

import styles from './header.module.scss';

const HeaderNav = () => {
  const pathname = usePathname();
  const router = useRouter();
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
          <Link className={styles.navLink} href='/news' onClick={closeMenu}>
            {item.label}
          </Link>
        ) : isHomePage ? (
          <ScrollLink
            activeClass={styles.active}
            className={styles.navLink}
            duration={800}
            offset={-120}
            onClick={closeMenu}
            smooth={true}
            spy={true}
            to={`${item.to}Section`}
          >
            {item.label}
          </ScrollLink>
        ) : (
          <a
            className={styles.navLink}
            onClick={() => {
              sessionStorage.setItem('scrollTo', item.to);
              router.push('/');
              closeMenu();
            }}
            style={{ cursor: 'pointer' }}
          >
            {item.label}
          </a>
        )}
      </li>
    ));

  const logoImage = (
    <Image
      alt='花南地区納涼盆踊り'
      className={styles.blurredLogo}
      height={30}
      priority
      src='/images/hanabonLogo.webp'
      width={144}
    />
  );

  return (
    <>
      <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
        <button aria-label='メニューを開閉する' className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={styles.navList}>
          <li>
            {isHomePage ? (
              <ScrollLink
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
          </li>
          {menuList}
          <li>
            <ThemeSwitcher setIsOpen={setIsOpen} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNav;
