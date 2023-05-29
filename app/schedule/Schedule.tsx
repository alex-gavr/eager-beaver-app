import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { TFutureEvents } from '@/db/schemas';

const FutureEvents = dynamic(() => import('@/components/future-events/FutureEvents'));
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

interface IProps {
  futureEvents: TFutureEvents[];
}

const Schedule = ({ futureEvents }: IProps) => {
  return (
    <>
      <Loader title='Предстоящие мероприятия' layoutId='futureEvents' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex w-screen max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <FutureEvents layoutId='futureEvents' futureEvents={futureEvents} />
        </section>
      </main>
    </>
  );
};

export default Schedule;
