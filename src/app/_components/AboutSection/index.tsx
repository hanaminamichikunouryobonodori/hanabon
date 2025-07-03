import ContentRenderer from '@/components/common/ContentRenderer';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types/microCMS';

import styles from './about.module.scss';

const AboutSection = ({ data }: { data: PageData }) => {
  return (
    <div className={styles.container}>
      <MinchoHeadingComponent level={2}>{data.title}</MinchoHeadingComponent>
      <div className='u-text-subtle'>
        <ContentRenderer content={data.content} />
      </div>
    </div>
  );
};

export default AboutSection;
