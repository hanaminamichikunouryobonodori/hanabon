type Reference<T, R> = T extends 'get' ? R : string | null;
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
type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type homepage<T = 'get'> = Structure<
  T,
  {
    /**
     * ヒーローセクション
     */
    hero: Reference<T, unknown>;
    /**
     * 開催日時セクション
     */
    eventDate: Reference<T, unknown>;
    /**
     * どんなお祭り？セクション
     */
    about: Reference<T, unknown>[];
    /**
     * お祭りの様子セクション
     */
    gallery: Reference<T, unknown>;
    /**
     * 実行委員募集セクション
     */
    joinCommittee?: Reference<T, unknown | null>;
    /**
     * アクセスセクション
     */
    access: Reference<T, unknown>;
    /**
     * 主催・後援セクション
     */
    sponsorship: Reference<T, unknown>;
  }
>;

export interface EndPoints {
  get: {
    homepage: homepage<'get'>;
  };
  gets: {
    homepage: homepage<'gets'>;
  };
  post: {
    homepage: homepage<'post'>;
  };
  put: {
    homepage: homepage<'put'>;
  };
  patch: {
    homepage: homepage<'patch'>;
  };
}
