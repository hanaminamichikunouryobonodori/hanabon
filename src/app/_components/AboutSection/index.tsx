import Image from 'next/image';

import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
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
              {isAbout && (
                <Image
                  alt=''
                  aria-hidden
                  className={styles.decoTopLeft}
                  height={1024}
                  src='/images/matsuri-hiyoko-1024x1024.png'
                  width={1024}
                />
              )}
              <MaruHeadingComponent
                className={isProgram ? 'mt-3xl' : ''}
                id={isAbout ? 'about' : isProgram ? 'program ' : ''}
                level={2}
              >
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
              {isAbout && (
                <Image
                  alt=''
                  aria-hidden
                  className={styles.decoBottomRight}
                  height={1024}
                  src='/images/natsumatsuri-1024x1024.png'
                  width={1024}
                />
              )}
            </div>
          </FadeInComponent>
        );
      })}
    </>
  );
};

export default AboutSection;
