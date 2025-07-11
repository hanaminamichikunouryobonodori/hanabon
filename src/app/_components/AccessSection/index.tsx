import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import styles from './AccessSection.module.scss';

const AccessSection = ({ data }: { data: PageData }) => {
  return (
    <FadeInComponent>
      <MaruHeadingComponent className={styles.title} id='access' level={2}>
        アクセス
      </MaruHeadingComponent>
      <div className='l-container l-container--full u-text-subtle'>
        <div className={`${styles.box} c-stripe-box`}>
          <ContentRenderer className='u-flex-center-column u-w-full' content={data.content} />
        </div>
      </div>
    </FadeInComponent>
  );
};

export default AccessSection;
