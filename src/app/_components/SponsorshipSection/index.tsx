import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import styles from './sponsorship.module.scss';

const SponsorshipSection = ({ data }: { data: PageData }) => {
  return (
    <FadeInComponent>
      <MaruHeadingComponent id='sponsorship' level={2}>
        主催
      </MaruHeadingComponent>
      <ContentRenderer className={styles.container} content={data.content} id='sponsorship' />
      <p className='u-flex-center'>皆様の温かいご支援に、心より感謝申し上げます。</p>
    </FadeInComponent>
  );
};

export default SponsorshipSection;
