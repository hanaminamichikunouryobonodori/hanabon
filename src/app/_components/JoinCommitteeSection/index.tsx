import React from 'react';

import CardComponent from '@/components/ui/CardComponent';
import { NewsData } from '@/types';

import styles from './joinCommittee.module.scss';

const JoinCommitteeSection = ({ data }: { data: NewsData }) => {
  const cardData = {
    title: data.title,
    image: data.featuredImage,
    description:
      '花南地区納涼盆踊りは準備・運営のサポーターを募集しています。「たまにしか参加できないけどやってみたい」「町会活動って少し敷居が高い気がする」そんな方々でも気軽にお声がけください。',
    link: `/news/${data.id}`,
    buttonText: 'サポーター,ボランティア',
  };

  return (
    <div className={`${styles.container} u-flex-center-column px-lg`}>
      <CardComponent cardData={cardData} />
    </div>
  );
};

export default JoinCommitteeSection;
