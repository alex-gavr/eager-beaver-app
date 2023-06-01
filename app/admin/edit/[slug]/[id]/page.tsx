import Faq from '@/components/admin/Faq';
import FutureEvent from '@/components/admin/FutureEvent';
import Pricing from '@/components/admin/Pricing';
import Review from '@/components/admin/Review';
import Teacher from '@/components/admin/Teacher';
import ThematicEvent from '@/components/admin/ThematicEvent';
import { IServerProps } from '@/app/page';
import { db } from '@/db/db';
import {
  IEventsData,
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
import { eq } from 'drizzle-orm';

interface IPageProps {}

const Page = async ({ params, searchParams }: IServerProps) => {
  const { id, slug } = params;

  if (id === null || slug === null) {
    return null;
  }

  async function updateTeacher(data: any) {
    'use server';
    const validTeacher = await insertTeacherSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });
    const res = await db
      .update(teachers)
      .set({
        fullName: validTeacher.fullName,
        description: validTeacher.description,
        image: validTeacher.image,
      })
      .where(eq(teachers.uuid, validTeacher.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'teachers') {
    const data = await db.select().from(teachers).where(eq(teachers.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Teacher dbData={data[0]} updateTeacher={updateTeacher} />
      </div>
    );
  }

  async function updateFaq(data: any) {
    'use server';
    const validFaq = await insertFaqSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db
      .update(faq)
      .set({ question: validFaq.question, description: validFaq.description })
      .where(eq(faq.uuid, validFaq.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'faq') {
    const data = await db.select().from(faq).where(eq(faq.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Faq dbData={data[0]} updateFaq={updateFaq} />
      </div>
    );
  }

  async function updateFutureEvent(data: any) {
    'use server';
    const validThematicEvent = await insertFutureEventsSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db
      .update(futureEvents)
      .set({
        eventName: validThematicEvent.eventName,
        description: validThematicEvent.description,
        age: validThematicEvent.age,
        durationLongerThanDay: validThematicEvent.durationLongerThanDay,
        eventStart: validThematicEvent.eventStart,
        eventEnd: validThematicEvent.eventEnd,
        price: validThematicEvent.price,
        participants: validThematicEvent.participants,
        totalSpots: validThematicEvent.totalSpots,
      })
      .where(eq(futureEvents.uuid, validThematicEvent.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'futureEvents') {
    const data = await db.select().from(futureEvents).where(eq(futureEvents.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <FutureEvent dbData={data[0]} updateFutureEvent={updateFutureEvent} />
      </div>
    );
  }

  async function updatePrice(data: any) {
    'use server';
    const validThematicEvent = await insertPriceSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db
      .update(prices)
      .set({
        price: validThematicEvent.price,
        priceName: validThematicEvent.priceName,
        cardColor: validThematicEvent.cardColor,
        feature1: validThematicEvent.feature1,
        feature2: validThematicEvent.feature2,
        feature3: validThematicEvent.feature3,
      })
      .where(eq(prices.uuid, validThematicEvent.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'prices') {
    const data = await db.select().from(prices).where(eq(prices.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Pricing dbData={data[0]} updatePrice={updatePrice} />
      </div>
    );
  }

  async function updateReview(data: any) {
    'use server';
    const validThematicEvent = await insertReviewSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db
      .update(reviews)
      .set({
        childName: validThematicEvent.childName,
        parentName: validThematicEvent.parentName,
        relationToChild: validThematicEvent.relationToChild,
        review: validThematicEvent.review,
        image: validThematicEvent.image,
      })
      .where(eq(reviews.uuid, validThematicEvent.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'reviews') {
    const data = await db.select().from(reviews).where(eq(reviews.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Review dbData={data[0]} updateReview={updateReview} />
      </div>
    );
  }

  async function updateThematicEvent(data: any) {
    'use server';
    const validThematicEvent = await insertThematicEventsSchema.parseAsync(data).catch((err) => {
      throw new Error(err);
    });

    const res = await db
      .update(thematicEvents)
      .set({
        heading: validThematicEvent.heading,
        paragraph: validThematicEvent.paragraph,
        imageSide: validThematicEvent.imageSide,
        images: validThematicEvent.images,
      })
      .where(eq(thematicEvents.uuid, validThematicEvent.uuid));

    if (res.rowsAffected === 1) {
      return 200;
    } else {
      return 500;
    }
  }

  if (slug === 'thematicEvents') {
    const data = await db.select().from(thematicEvents).where(eq(thematicEvents.uuid, id));

    const d = data.map((d) => {
      return {
        ...d,
        images: JSON.parse(d.images),
      };
    })[0] as IEventsData;

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <ThematicEvent dbData={d} updateThematicEvent={updateThematicEvent} />
      </div>
    );
  }
};

export default Page;
