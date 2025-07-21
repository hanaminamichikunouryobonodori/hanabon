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

export type manuals<T = 'get'> = Structure<
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
      | manuals_rich_text
      | manuals_image
      | manuals_boxes
      | manuals_card
      | manuals_heading
      | manuals_two_column_block
      | manuals_grid_container
      | manuals_accordion
      | manuals_spacer
      | manuals_divider
      | manuals_gallery
    )[];
    /**
     * アイキャッチ画像
     */
    featuredImage?: MediaType;
  }
>;

interface manuals_rich_text {
  fieldId: 'rich_text';
  /**
   * 本文の位置
   */
  align?: ['左寄せ' | '中央揃え' | '右寄せ'];
  /**
   * 本文
   */
  rich_text: any;
  /**
   * ID
   */
  content_id?: string;
}
interface manuals_gallery {
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
interface manuals_image {
  fieldId: 'image';
  /**
   * 画像
   */
  image_content?: MediaType;
}
interface manuals_boxes {
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
interface manuals_two_column_block {
  fieldId: 'two_column_block';
  /**
   * 左カラムの内容
   */
  column_left: (
    | manuals_rich_text
    | manuals_image
    | manuals_boxes
    | manuals_divider
    | manuals_spacer
    | manuals_accordion
    | manuals_heading
    | manuals_card
  )[];
  /**
   * 右カラムの内容
   */
  column_right: (
    | manuals_rich_text
    | manuals_image
    | manuals_boxes
    | manuals_heading
    | manuals_spacer
    | manuals_grid_container
    | manuals_divider
    | manuals_accordion
  )[];
}
interface manuals_heading {
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
interface manuals_spacer {
  fieldId: 'spacer';
  /**
   * 余白の大きさ
   */
  space_height: ['極小' | '小' | '中' | '大' | '特大'];
}
interface manuals_grid_container {
  fieldId: 'grid_container';
  /**
   * タイプ
   */
  grid_type: ['auto-fill' | 'auto-fit' | 'thirds' | 'fourth' | '2-8' | '8-2' | '3-7' | '7-3'];
  /**
   * 内容
   */
  grid_content: (manuals_rich_text | manuals_image | manuals_boxes)[];
}
interface manuals_card {
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
interface manuals_divider {
  fieldId: 'divider';
  /**
   * 線の種類
   */
  divider_style: ['実線' | '破線' | '点線' | '二重線' | 'グラデーション' | '斜線'];
}
interface manuals_heading_and_content {
  fieldId: 'heading_and_content';
  /**
   * 見出し
   */
  title: string;
  /**
   * 内容
   */
  content: any;
}
interface manuals_accordion {
  fieldId: 'accordion';
  /**
   * 内容
   */
  accordion_content: manuals_heading_and_content[];
  /**
   * 種類
   */
  accordion_type?: ['通常' | 'Q&A'];
}

export interface EndPoints {
  get: {
    manuals: manuals<'get'>;
  };
  gets: {
    manuals: manuals<'gets'>;
  };
  post: {
    manuals: manuals<'post'>;
  };
  put: {
    manuals: manuals<'put'>;
  };
  patch: {
    manuals: manuals<'patch'>;
  };
}
