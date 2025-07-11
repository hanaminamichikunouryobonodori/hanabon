import { FadeInComponent } from '@/components/animations/FadeIn';
import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import style from './eventDate.module.scss';

const EventDateSection = ({ data }: { data: PageData }) => {
  return (
    <FadeInComponent>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <MaruHeadingComponent className={style.title} id='eventDate' level={2}>
            <span>{data.title}</span>
          </MaruHeadingComponent>
        </div>
        <ContentRenderer className={style.box} content={data.content} />
      </div>
    </FadeInComponent>
  );
};

export default EventDateSection;
