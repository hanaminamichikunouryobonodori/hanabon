import ContentRenderer from '@/components/common/ContentRenderer';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types/microCMS';

const AccessSection = ({ data }: { data: PageData['access'] }) => {
  return (
    <>
      <MinchoHeadingComponent level={2}>アクセス</MinchoHeadingComponent>
      <div className='l-container--full u-text-subtle '>
        <ContentRenderer content={data.content} />
      </div>
    </>
  );
};

export default AccessSection;
