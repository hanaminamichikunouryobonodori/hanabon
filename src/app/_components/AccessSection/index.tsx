import ContentRenderer from '@/components/common/ContentRenderer';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types';

const AccessSection = ({ data }: { data: PageData }) => {
  return (
    <>
      <MinchoHeadingComponent id='access' level={2}>
        アクセス
      </MinchoHeadingComponent>
      <div className='l-container l-container--full u-text-subtle px-lg'>
        <ContentRenderer content={data.content} />
      </div>
    </>
  );
};

export default AccessSection;
