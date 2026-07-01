'use client';

import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';
import { menuItems } from '@/libs/navigation';

import styles from './header.module.scss';

type MultiSpyLinkProps = {
  ids: string[];
  label: string;
  closeMenu: () => void;
};

function MultiSpyLink({ ids, label, closeMenu }: MultiSpyLinkProps) {
  const [isActive, setIsActive] = useState(false);
  const activeSet = useRef(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? activeSet.current.add(e.target.id) : activeSet.current.delete(e.target.id),
        );
        setIsActive(activeSet.current.size > 0);
      },
      { threshold: 0.3 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    scroller.scrollTo(ids[0], { duration: 800, smooth: true, offset: -120 });
    closeMenu();
  };

  return (
    <a
      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {label}
    </a>
  );
}

const HeaderNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, [isOpen, setIsOpen]);
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
        {isHomePage && item.to === 'faq' ? (
          <MultiSpyLink ids={['faqSection', 'contactSection']} label={item.label} closeMenu={closeMenu} />
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
      onClick={closeMenu}
      priority
      src='/images/hanabonLogo.webp'
      width={144}
    />
  );

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
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
