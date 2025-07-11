import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import styles from './AccessSection.module.scss';

const AccessSection = ({ data }: { data: PageData }) => {
  return (
    <>
      <MaruHeadingComponent className={styles.title} id='access' level={2}>
        アクセス
      </MaruHeadingComponent>
      <div className='l-container u-text-subtle px-lg'>
        <div className={`${styles.box} c-stripe-box`}>
          <ContentRenderer className='u-flex-center-column u-w-full' content={data.content} />
        </div>
      </div>
    </>
  );
};

export default AccessSection;
