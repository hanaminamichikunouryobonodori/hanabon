interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type MediaType = {
  url: string;
  width: number;
  height: number;
};
type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type news<T = 'get'> = Structure<
  T,
  {
    /**
     * タイトル
     */
    title: string;
    /**
     * 本文
     */
    content: (
      | news_rich_text
      | news_gallery
      | news_image
      | news_boxes
      | news_two_column_block
      | news_heading
      | news_spacer
    )[];
    /**
     * アイキャッチ画像
     */
    featuredImage?: MediaType;
  }
>;

interface news_rich_text {
  fieldId: 'rich_text';
  /**
   * 本文の位置
   */
  align?: ['左寄せ' | '中央揃え' | '右寄せ'];
  /**
   * 本文
   */
  rich_text?: any;
  /**
   * ID
   */
  content_id?: string;
}
interface news_gallery {
  fieldId: 'gallery';
  /**
   * ギャラリー
   */
  gallery_content: MediaType[];
  /**
   * 画像比率
   */
  gallery_aspect: ['16:9' | '4:3' | '1:1.414（A4/ポスター）'];
}
interface news_image {
  fieldId: 'image';
  /**
   * 画像
   */
  image_content?: MediaType;
}
interface news_boxes {
  fieldId: 'boxes';
  /**
   * 種類
   */
  box_class?: ['シンプルボックス' | 'インフォ' | 'Q&A' | '注意・警告' | '付箋ボックス'];
  /**
   * ボックスの内容
   */
  box_content?: any;
}
interface news_two_column_block {
  fieldId: 'two_column_block';
  /**
   * 左カラムの内容
   */
  column_left: (news_rich_text | news_image | news_boxes)[];
  /**
   * 右カラムの内容
   */
  column_right: (news_rich_text | news_image | news_boxes)[];
}
interface news_heading {
  fieldId: 'heading';
  /**
   * 見出し
   */
  heading_content: string;
  /**
   * 見出しレベル
   */
  heading_level: ['2' | '3' | '4' | '5' | '6'];
  /**
   * ID
   */
  heading_id?: string;
}
interface news_spacer {
  fieldId: 'spacer';
  /**
   * 余白の大きさ
   */
  space_height?: ['極小' | '小' | '中' | '大' | '特大'];
}

export interface EndPoints {
  get: {
    news: news<'get'>;
  };
  gets: {
    news: news<'gets'>;
  };
  post: {
    news: news<'post'>;
  };
  put: {
    news: news<'put'>;
  };
  patch: {
    news: news<'patch'>;
  };
}
