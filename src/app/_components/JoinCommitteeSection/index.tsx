import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import MinchoHeadingComponent from '@/components/ui/MinchoHeading';
import { PageData } from '@/types/microCMS';

import styles from './joinCommittee.module.scss';

const JoinCommitteeSection = ({ data }: { data: PageData['joinCommittee'] }) => {
  return (
    <div className={`${styles.container} u-flex-center-column`}>
      <MinchoHeadingComponent level={2}>{data.title}</MinchoHeadingComponent>
      <Link href={`news/${data.id}`}>
        <Image
          alt={data.title}
          className='u-responsive-image rounded-t-md rounded-b-md'
          height={data.featuredImage?.height ?? 630}
          src={data.featuredImage?.url ?? '/images/noImage.png'}
          width={data.featuredImage?.width ?? 1200}
        />
      </Link>
    </div>
  );
};

export default JoinCommitteeSection;
