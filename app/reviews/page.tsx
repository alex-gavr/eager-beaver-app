import Reviews from './Reviews';
import { Metadata } from 'next';
import { db } from '@/db/db';
import { TReviews, reviews } from '@/db/schemas';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Вот что думают о нас родители! Мы ценим каждый ваш отзыв, вы помогаете нам становится лучше.',
};

const Page = async ({}: IPageProps) => {
  const reviewsData = (await db.select().from(reviews)) as TReviews[];

  return (
    <>
      <Reviews reviews={reviewsData} />
    </>
  );
};

export default Page;
