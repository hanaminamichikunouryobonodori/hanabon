import { getHomeContentById, getTheme } from '@/libs/microCMS';

import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: `プライバシーポリシー | ${process.env.SITE_NAME}`,
};

export default async function PrivacyPage() {
  const [data, theme] = await Promise.all([getHomeContentById('a37ykm12l'), getTheme()]);
  const ogpImageUrl =
    theme.ogpImage?.url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/hanabonOGP2026.png`;

  return <PrivacyClient data={data} ogpImageUrl={ogpImageUrl} />;
}
