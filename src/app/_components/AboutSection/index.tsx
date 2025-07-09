import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MinchoHeading';
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
          <FadeInComponent key={section.id}>
            <div className={isAbout ? styles.container : ''} id={isProgram ? 'program' : ''}>
              <MaruHeadingComponent id={isAbout ? 'about' : isProgram ? 'program ' : ''} level={2}>
                {section.title}
              </MaruHeadingComponent>
              <ContentRenderer
                className={`${isAbout ? 'u-text-subtle' : isProgram ? styles.staggeredContainer : ''}`}
                content={section.content}
              />
              {isProgram && (
                <small>
                  ※内容は年度によって変更される場合があります。詳しい内容は開催年のプログラムを御覧ください。
                </small>
              )}
            </div>
          </FadeInComponent>
        );
      })}
    </>
  );
};

export default AboutSection;
