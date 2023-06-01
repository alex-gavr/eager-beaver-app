import { IServerProps } from '@/app/page';
import { db } from '@/db/db';
import { faq, futureEvents, prices, reviews, teachers, thematicEvents } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import DeleteCard from './DeleteCard';
import { revalidatePath } from 'next/cache';

interface IPageProps {}

const Page = async ({ params, searchParams }: IServerProps) => {
  const { slug } = params;

  if (slug === null) {
    return null;
  }

  async function deleteFutureEvent(uuid: string) {
    'use server';
    await db.delete(futureEvents).where(eq(futureEvents.uuid, uuid));
    revalidatePath('/admin/delete/futureEvents');
  }
  async function deleteTeacher(uuid: string) {
    'use server';
    await db.delete(teachers).where(eq(teachers.uuid, uuid));
    revalidatePath('/admin/delete/teachers');
  }
  async function deleteReview(uuid: string) {
    'use server';
    await db.delete(reviews).where(eq(reviews.uuid, uuid));
    revalidatePath('/admin/delete/reviews');
  }
  async function deleteThematicEvent(uuid: string) {
    'use server';
    await db.delete(thematicEvents).where(eq(thematicEvents.uuid, uuid));
    revalidatePath('/admin/delete/futureEvents');
  }
  async function deletePrice(uuid: string) {
    'use server';
    await db.delete(prices).where(eq(prices.uuid, uuid));
    revalidatePath('/admin/delete/prices');
  }
  async function deleteFaq(uuid: string) {
    'use server';
    await db.delete(faq).where(eq(faq.uuid, uuid));
    revalidatePath('/admin/delete/faq');
  }

  if (slug === 'futureEvents') {
    const data = await db.select().from(futureEvents);
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard
              key={item.uuid}
              uuid={item.uuid}
              heading={item.eventName}
              deleteItem={deleteFutureEvent}
            />
          ))}
        </div>
      </div>
    );
  }

  if (slug === 'teachers') {
    const data = await db.select().from(teachers);
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard key={item.uuid} uuid={item.uuid} heading={item.fullName} deleteItem={deleteTeacher} />
          ))}
        </div>
      </div>
    );
  }

  if (slug === 'reviews') {
    const data = await db.select().from(reviews);
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard key={item.uuid} uuid={item.uuid} heading={item.childName} deleteItem={deleteReview} />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'thematicEvents') {
    const data = await db.select().from(thematicEvents);
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard
              key={item.uuid}
              uuid={item.uuid}
              heading={item.heading}
              deleteItem={deleteThematicEvent}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'prices') {
    const data = await db.select().from(prices);
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard key={item.uuid} uuid={item.uuid} heading={item.price} deleteItem={deletePrice} />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'faq') {
    const data = await db.select().from(faq);

    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl lg:text-5xl'>Что удалим?</h1>
        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
          {data.map((item, index) => (
            <DeleteCard key={item.uuid} uuid={item.uuid} heading={item.question} deleteItem={deleteFaq} />
          ))}
        </div>
      </div>
    );
  }
};

export default Page;
