import Link from 'next/link';

import { NewsData, NewsListData, PageData } from '@/types';
import { EndPoints } from '@/types/microCMS/news-types';

import styles from './postNavigation.module.scss';

type Props = {
  allPosts: NewsListData['contents'];
  currentPost: NewsData;
};

const PostNavigation = ({ allPosts, currentPost }: Props) => {
  const currentIndex = allPosts.findIndex((post) => post.id === currentPost.id);

  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className={`l-grid l-grid--half ${styles.postNavigation}`}>
      <div className={styles.navItem}>
        {prevPost && (
          <Link className={styles.prevLink} href={`/news/${prevPost.id}`}>
            <span className={styles.label}>&laquo; 前の記事へ</span>
            <span className={styles.title}>{prevPost.title}</span>
          </Link>
        )}
      </div>
      <div className={styles.navItem}>
        {nextPost && (
          <Link className={styles.nextLink} href={`/news/${nextPost.id}`}>
            <span className={styles.label}>次の記事へ &raquo;</span>
            <span className={styles.title}>{nextPost.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostNavigation;
