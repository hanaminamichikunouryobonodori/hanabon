import Image from 'next/image';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi';

import styles from '@/app/news/[slug]/post.module.scss';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import NewsList from '@/components/ui/NewsList';
import { getNewsList } from '@/libs/microCMS';
import { NewsListData } from '@/types';

const NotFound = async () => {
  const data: NewsListData = await getNewsList('home');

  return (
    <>
      <main className='l-container'>
        <Breadcrumbs title='404 Not Found' />
        <div className='u-min-h-screen py-xl'>
          <h1>404 Not Found</h1>
          <p>お探しのページは見つかりませんでした。</p>
          <Image alt='404' height={1080} src='/images/404NotFound.png' width={1920} />
          <p>一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。</p>
          <span className='u-w-full u-h-full py-xxl u-flex-right'>
            <Link href='/'>
              <button className='c-button c-button--primary'>
                <span className='u-inline-flex-center-y'>
                  <HiHome />
                  トップページへ戻る
                </span>
              </button>
            </Link>
          </span>
          <div className={styles.content}>
            <h2>最新の記事</h2>
          </div>
          <NewsList data={data} />
        </div>
        <Breadcrumbs title='404 Not Found' />
      </main>
    </>
  );
};

export default NotFound;
