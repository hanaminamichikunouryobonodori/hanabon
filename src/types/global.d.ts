// define type of environment variables

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_DOMAIN: string;
    readonly HERO_PAGE: string;
    readonly ABOUT_PAGE: string;
    readonly GALLERY_IMAGE_PAGE: string;
    readonly GALLERY_VIDEO_PAGE: string;
    readonly EVENT_DATE_PAGE: string;
    readonly SPONSORED_PAGE: string;
    readonly SPONSOR_PAGE: string;
    readonly COOPERATE_PAGE: string;
  }
}
