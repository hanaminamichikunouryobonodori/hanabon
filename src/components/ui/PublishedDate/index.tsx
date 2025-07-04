import { FaCalendarAlt } from 'react-icons/fa';

type Props = {
  dateString: string;
  className?: string;
  id?: string;
};

const PublishedDate = ({ dateString, className, id }: Props) => {
  const formattedDate = new Date(dateString).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  });
  if (id === 'updated') {
    return (
      <span className='u-inline-flex-center-y'>
        <small>
          <time dateTime={dateString}>{formattedDate}</time>
        </small>
      </span>
    );
  }

  return (
    <p className={className}>
      <small>
        <span className='u-inline-flex-center-y'>
          <FaCalendarAlt className='mr-sm' />
          <time dateTime={dateString}>{formattedDate}</time>
        </span>
      </small>
    </p>
  );
};

export default PublishedDate;
