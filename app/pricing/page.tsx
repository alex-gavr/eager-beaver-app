import Pricing from './Pricing';
import { Metadata } from 'next';
import { db } from '@/db/db';
import { TPrices, prices } from '@/db/schemas';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Тарифы',
  description: 'Возможные варианты занятий с нами',
};

const Page = async ({}: IPageProps) => {
  const pricesData = (await db.select().from(prices)) as TPrices[];

  return (
    <>
      <Pricing prices={pricesData} />
    </>
  );
};

export default Page;
