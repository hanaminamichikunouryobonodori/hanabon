import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import style from './eventDate.module.scss';

const EventDateSection = ({ data }: { data: PageData }) => {
  return (
    <div className={style.container}>
      <MaruHeadingComponent id='eventDate' level={2}>
        {data.title}
      </MaruHeadingComponent>
      <ContentRenderer content={data.content} />
    </div>
  );
};

export default EventDateSection;
