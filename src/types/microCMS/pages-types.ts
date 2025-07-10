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

export type pages<T = 'get'> = Structure<
  T,
  {
    /**
     * タイトル
     */
    title: string;
    /**
     * 内容
     */
    content: (
      | pages_rich_text
      | pages_image
      | pages_boxes
      | pages_card
      | pages_heading
      | pages_two_column_block
      | pages_grid_container
      | pages_overlapping_box
      | pages_divider
      | pages_spacer
      | pages_gallery
    )[];
  }
>;

interface pages_rich_text {
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
interface pages_gallery {
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
interface pages_image {
  fieldId: 'image';
  /**
   * 画像
   */
  image_content?: MediaType;
}
interface pages_boxes {
  fieldId: 'boxes';
  /**
   * 種類
   */
  box_class?: [
    'シンプルボックス' | '塗りつぶしボックス' | 'インフォ' | 'Q&A' | '注意・警告' | '付箋ボックス',
  ];
  /**
   * ボックスの内容
   */
  box_content?: any;
}
interface pages_two_column_block {
  fieldId: 'two_column_block';
  /**
   * 左カラムの内容
   */
  column_left: (
    | pages_rich_text
    | pages_image
    | pages_boxes
    | pages_card
    | pages_heading
    | pages_divider
    | pages_spacer
  )[];
  /**
   * 右カラムの内容
   */
  column_right: (
    | pages_rich_text
    | pages_image
    | pages_boxes
    | pages_card
    | pages_heading
    | pages_spacer
    | pages_grid_container
  )[];
}
interface pages_heading {
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
interface pages_spacer {
  fieldId: 'spacer';
  /**
   * 余白の大きさ
   */
  space_height: ['極小' | '小' | '中' | '大' | '特大'];
}
interface pages_grid_container {
  fieldId: 'grid_container';
  /**
   * タイプ
   */
  grid_type: ['auto-fill' | 'auto-fit' | 'thirds' | 'fourth' | '2-8' | '8-2' | '3-7' | '7-3'];
  /**
   * 内容
   */
  grid_content: (pages_rich_text | pages_image | pages_boxes | pages_card)[];
}
interface pages_card {
  fieldId: 'card';
  /**
   * 画像
   */
  card_image: MediaType;
  /**
   * タイトル
   */
  card_title: string;
  /**
   * 説明文
   */
  card_description: any;
  /**
   * リンク
   */
  card_link?: string;
  /**
   * ボタンテキスト
   */
  card_button_text?: string;
}
interface pages_divider {
  fieldId: 'divider';
  /**
   * 線の種類
   */
  divider_style: ['実線' | '破線' | '点線' | '二重線' | 'グラデーション' | '斜線'];
}
interface pages_overlapping_box {
  fieldId: 'overlapping_box';
  /**
   * 内容
   */
  overlapping_cards: pages_card[];
}

export interface EndPoints {
  get: {
    pages: pages<'get'>;
  };
  gets: {
    pages: pages<'gets'>;
  };
  post: {
    pages: pages<'post'>;
  };
  put: {
    pages: pages<'put'>;
  };
  patch: {
    pages: pages<'patch'>;
  };
}
