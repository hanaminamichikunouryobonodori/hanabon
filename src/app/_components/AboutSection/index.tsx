import ContentRenderer from '@/components/common/ContentRenderer';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types';

import styles from './about.module.scss';

interface AboutSectionProps {
  data: PageData[];
}

const AboutSection = ({ data }: AboutSectionProps) => {
  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <>
      {data.map((section) => {
        const isAbout = section.title === 'どんなお祭り？';
        return (
          <div className={isAbout ? styles.container : 'l-section'} key={section.id}>
            <MinchoHeadingComponent level={2}>{section.title}</MinchoHeadingComponent>
            <ContentRenderer
              className={`${isAbout ? 'u-text-subtle' : ''}`}
              content={section.content}
            />
          </div>
        );
      })}
    </>
  );
};

export default AboutSection;
