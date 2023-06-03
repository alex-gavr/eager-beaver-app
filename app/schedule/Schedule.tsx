import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { TFutureEvents, futureEvents } from '@/db/schemas';
import { db } from '@/db/db';

const FutureEvents = dynamic(() => import('@/components/future-events/FutureEvents'));

interface IProps {
  // futureEvents: TFutureEvents[];
}

const Schedule = async ({}: IProps) => {
  const futureEventsData = (await db.select().from(futureEvents)) as TFutureEvents[];
  return (
    <>
      <Loader title='Предстоящие мероприятия' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex w-screen max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <FutureEvents futureEvents={futureEventsData} />
        </section>
      </main>
    </>
  );
};

export default Schedule;
