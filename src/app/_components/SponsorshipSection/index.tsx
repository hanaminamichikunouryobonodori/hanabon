import ContentRenderer from '@/components/common/ContentRenderer';
import { PageData } from '@/types/microCMS';

const SponsorshipSection = ({ data }: { data: PageData }) => {
  return (
    <>
      <ContentRenderer content={data.content} id='sponsorship' />
      <p className='u-flex-center'>皆様の温かいご支援に、心より感謝申し上げます。</p>
    </>
  );
};

export default SponsorshipSection;
