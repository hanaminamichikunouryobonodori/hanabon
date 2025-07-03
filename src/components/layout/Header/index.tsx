import styles from './header.module.scss';
import HeaderNav from './HeaderNav';

export const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderNav />
    </header>
  );
};
