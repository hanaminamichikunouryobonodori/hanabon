import Image from 'next/image';

import SafeHtmlRenderer from '../SafeHtmlRenderer';

import styles from './OverlappingBox.module.scss';

// Propsの定義を修正
interface BoxProps {
  title: string;
  description: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  link?: string;
  buttonText?: string;
  className?: string; // 親から追加のクラスを受け取る
  style?: React.CSSProperties; // 親からインラインスタイルを受け取る
}

// コンポーネントの引数を修正
const OverlappingBox = ({
  boxData,
  className,
  style,
}: {
  boxData: BoxProps;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={styles.container}>
      <h3>{boxData.title}</h3>
      {boxData.image && (
        <Image
          alt={boxData.title}
          className='u-responsive-image'
          height={boxData.image.height}
          src={boxData.image.url}
          width={boxData.image.width}
        />
      )}

      <div className={styles.description}>
        <SafeHtmlRenderer htmlContent={boxData.description} />
      </div>

      {boxData.buttonText && boxData.link && (
        <a className={styles.button} href={boxData.link}>
          {boxData.buttonText}
        </a>
      )}
    </div>

    // ★★★ 削除：</div>
  );
};

export default OverlappingBox;
