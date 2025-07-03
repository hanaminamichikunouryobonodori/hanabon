import { NextPage } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import { Props } from '../layout';

const NewsLayout: NextPage<Props> = async ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
export default NewsLayout;
