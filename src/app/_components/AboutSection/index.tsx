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
        const isProgram = section.title === 'お祭りの内容';
        return (
          <div className={isAbout ? styles.container : ''} key={section.id}>
            <MinchoHeadingComponent level={2}>{section.title}</MinchoHeadingComponent>
            <ContentRenderer
              className={`${isAbout ? 'u-text-subtle' : isProgram ? styles.staggeredContainer : ''}`}
              content={section.content}
            />
          </div>
        );
      })}
    </>
  );
};

export default AboutSection;
