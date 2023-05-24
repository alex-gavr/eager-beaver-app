import FAQ from './Faq';
import { Metadata } from 'next';
import { db } from '@/db/db';
import { TFaq, faq } from '@/db/schemas';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Ответы на Вопросы',
  description: 'Мы собрали здесь самые популярные вопросы и ответы на них',
};

const Page = async ({}: IPageProps) => {
  const faqData = (await db.select().from(faq)) as TFaq[];
  
  return (
    <>
      <FAQ faq={faqData} />
    </>
  );
};

export default Page;
