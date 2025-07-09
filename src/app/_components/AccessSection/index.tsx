import ContentRenderer from '@/components/common/ContentRenderer';
import MaruHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types';

const AccessSection = ({ data }: { data: PageData }) => {
  return (
    <>
      <MaruHeadingComponent id='access' level={2}>
        アクセス
      </MaruHeadingComponent>
      <div className='l-container l-container--full u-text-subtle px-lg'>
        <ContentRenderer content={data.content} />
      </div>
    </>
  );
};

export default AccessSection;
