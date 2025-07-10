import { NextPage } from 'next';

import { Props } from '../layout';

const NewsLayout: NextPage<Props> = async ({ children }) => {
  return <main>{children}</main>;
};
export default NewsLayout;
