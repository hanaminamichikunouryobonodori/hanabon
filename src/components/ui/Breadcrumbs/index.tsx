'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiChevronRight, HiHome } from 'react-icons/hi';

import { JsonLd } from '@/components/common/JsonLd';

import styles from './Breadcrumbs.module.scss';

const breadcrumbNameMap: { [key: string]: string } = {
  news: 'お知らせ一覧',
  privacy: 'プライバシーポリシー',
};

interface Props {
  title?: string;
}

const Breadcrumbs = ({ title }: Props) => {
  const pathname = usePathname();
  if (!pathname) {
    return null;
  }

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const items = [
    { href: '/', label: <HiHome /> },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

      const label = breadcrumbNameMap[segment] || segment;

      return { href, label };
    }),
  ];

  if (items.length <= 1) {
    return null;
  }

  if (title && items.length > 1) {
    const lastItem = items[items.length - 1];
    lastItem.label = title;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: typeof item.label === 'string' ? item.label : 'ホーム',
      item: `https://hanabon.vercel.app${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label='パンくずリスト' className={styles.breadcrumbs}>
        <ol>
          {items.map((item, index) => (
            <li className={styles.breadcrumbItem} key={item.href}>
              {index < items.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current='page'>{item.label}</span>
              )}

              {index < items.length - 1 && (
                <HiChevronRight aria-hidden='true' className={styles.separator} />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
