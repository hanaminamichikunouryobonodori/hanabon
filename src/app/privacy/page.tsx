import { getHomeContentById } from '@/libs/microCMS';

import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: `プライバシーポリシー | ${process.env.SITE_NAME}`,
};

export default async function PrivacyPage() {
  const data = await getHomeContentById('a37ykm12l');

  return <PrivacyClient data={data} />;
}
