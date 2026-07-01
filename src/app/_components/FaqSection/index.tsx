import Link from 'next/link';

import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import styles from './faq.module.scss';

interface FaqSectionProps {
  data: PageData;
}

const FaqSection = ({ data }: FaqSectionProps) => {
  return (
    <FadeInComponent>
      <MaruHeadingComponent className={styles.title} id='faq' level={2}>
        {data.title}
      </MaruHeadingComponent>
      <div className={`${styles.box} l-container c-diagonal-box u-flex-left-column`}>
        <div className={styles.qaContent}>
          <p className={styles.lead}>お問い合わせの前に、よくあるご質問をご確認ください。</p>
          <ContentRenderer content={data.content} />
          <hr />
          <p className={styles.contactNote}>
            上記で解決しない場合は、お気軽にお問い合わせください。
            <br />
            <Link href='/#contactSection'>お問い合わせフォームはこちら →</Link>
          </p>
        </div>
      </div>
    </FadeInComponent>
  );
};

export default FaqSection;
