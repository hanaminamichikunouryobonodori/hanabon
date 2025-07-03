import ContentRenderer from '@/components/common/ContentRenderer';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types/microCMS';

import style from './eventDate.module.scss';

const EventDateSection = ({ data }: { data: PageData }) => {
  return (
    <div className={style.container}>
      <MinchoHeadingComponent level={2}>{data.title}</MinchoHeadingComponent>
      <ContentRenderer content={data.content} />
    </div>
  );
};

export default EventDateSection;
