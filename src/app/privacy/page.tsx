import styles from '@/app/news/[slug]/post.module.scss';
import ContentRenderer from '@/components/common/ContentRenderer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getHomeContentById } from '@/libs/microcms';

const PrivacyPolicy = async () => {
  const data = await getHomeContentById('a37ykm12l');

  return (
    <article className={`${styles.container} l-container l-container--narrow`} id='policy'>
      <Breadcrumbs />
      <h1>プライバシーポリシー</h1>
      <ContentRenderer className={styles.content} content={data.content} />
      <Breadcrumbs />
    </article>
  );
};

export default PrivacyPolicy;
