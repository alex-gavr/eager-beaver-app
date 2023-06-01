import { IServerProps } from '@/app/page';
import Faq from '@/components/admin/Faq';
import FutureEvent from '@/components/admin/FutureEvent';
import Pricing from '@/components/admin/Pricing';
import Review from '@/components/admin/Review';
import Teacher from '@/components/admin/Teacher';
import ThematicEvent from '@/components/admin/ThematicEvent';
import { db } from '@/db/db';
import {
  faq,
  futureEvents,
  insertFaqSchema,
  insertFutureEventsSchema,
  insertPriceSchema,
  insertReviewSchema,
  insertTeacherSchema,
  insertThematicEventsSchema,
  prices,
  reviews,
  teachers,
  thematicEvents,
} from '@/db/schemas';

interface IPageProps {}

const Page = ({ params }: IServerProps) => {
  const { slug } = params;

  

  async function addTeacher(data: any) {
    'use server';
    const validTeacher = await insertTeacherSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(teachers).values(validTeacher);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }
  async function addReview(data: any) {
    'use server';
    const validReview = await insertReviewSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(reviews).values(validReview);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  async function addFutureEvent(data: any) {
    'use server';
    const validFutureEvent = await insertFutureEventsSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(futureEvents).values(validFutureEvent);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }
  async function addPrice(data: any) {
    'use server';
    const validPrice = await insertPriceSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(prices).values(validPrice);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  async function addFaq(data: any) {
    'use server';
    const validFaq = await insertFaqSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(faq).values(validFaq);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  async function addThematicEvent(data: any) {
    'use server';
    const validThematicEvent = await insertThematicEventsSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db.insert(thematicEvents).values(validThematicEvent);

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  return (
    <section className='relative flex min-h-[90vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-2 py-4 lg:py-10'>
      {slug === 'teachers' && <Teacher addTeacher={addTeacher} />}
      {slug === 'reviews' && <Review addReview={addReview} />}
      {slug === 'futureEvents' && <FutureEvent addFutureEvent={addFutureEvent} />}
      {slug === 'prices' && <Pricing addPrice={addPrice} />}
      {slug === 'faq' && <Faq addFaq={addFaq} />}
      {slug === 'thematicEvents' && <ThematicEvent addThematicEvent={addThematicEvent} />}
    </section>
  );
};

export default Page;
