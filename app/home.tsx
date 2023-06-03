import Hero from '@/components/home/Hero';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { IEventsData, TFutureEvents } from '@/db/schemas';
import Form from './form/Form';

const TeachProcess = dynamic(() => import('@/components/home/teach-process/teach-process'), {
  ssr: false,
});
const LazyForm = dynamic(() => import('./LazyForm'), {
  ssr: false,
});
const FutureEvents = dynamic(() => import('@/components/future-events/FutureEvents'), {
  ssr: false,
});
const Events = dynamic(() => import('@/components/home/thematic-events/events'));
const FlyingBeaver = dynamic(() => import('@/components/FlyingBeaver/FlyingBeaver'));

interface IProps {
  futureEvents: TFutureEvents[];
  themeEvents: IEventsData[];
}

const Home = ({ futureEvents, themeEvents }: IProps) => {
  return (
    <>
      <Loader title='Eager Beaver Language School' layoutId='eagerBeaverLanguageSchool' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <FlyingBeaver />
        <Hero />
        <TeachProcess />
        <Events themeEvents={themeEvents} />
        <section className='relative flex w-screen max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <FutureEvents futureEvents={futureEvents} />
        </section>
        <LazyForm />
      </main>
    </>
  );
};
export default Home;
