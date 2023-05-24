import Teachers from './Teachers';
import { Metadata } from 'next';
import { db } from '@/db/db';
import { TTeachers, teachers } from '@/db/schemas';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Преподаватели',
  description:
    'Наши прекрасные учителя знают как найти подход к каждому ученику и сделать обучение увлекательным путешествием. Поэтому результаты не заставят себя ждать!',
};

const Page = async ({}: IPageProps) => {
  const teachersData = (await db.select().from(teachers)) as TTeachers[];

  return (
    <>
      <Teachers teachers={teachersData} />
    </>
  );
};

export default Page;
