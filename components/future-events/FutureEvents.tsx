'use client';
import AnimatedTextWords from '../AnimatedTextWords/AnimatedTextWords';
import cloud from '@/images/clouds/5.svg';
import cloud2 from '@/images/clouds/3.svg';
import cloud3 from '@/images/clouds/1.svg';
import cloud4 from '@/images/clouds/2.svg';
import Image from 'next/image';
import { baseClassName } from '../CloudsContainer';
import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EventCard from './event-card/EventCard';
import { TFutureEvents } from '@/db/schemas';
import { cn } from '@/utils/cn';

const BeaverSleeps = dynamic(() => import('./BeaverSleeps'));

interface IProps {
  futureEvents?: TFutureEvents[];
}

const FutureEvents = ({ futureEvents }: IProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div
        className='z-50 flex w-full max-w-[1500px] flex-col items-center justify-center gap-20 px-2 py-4 md:p-8'
        ref={ref}
      >
        {inView ? (
          <>
            <m.h1
              className='mx-2 rounded-3xl bg-accent-800 px-8 py-2 text-center dark:bg-accent-800'
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <AnimatedTextWords
                className='dark:text-neutral-950'
                text='Предстоящие мероприятия'
                title={true}
                textAnimation='fromBottomLeft'
              />
            </m.h1>
            <div className='flex w-full flex-col items-center justify-center gap-x-16 gap-y-20 md:flex-row md:flex-wrap lg:gap-x-8 '>
              {futureEvents && futureEvents?.length === 0 ? (
                <h2 className='text-center'>Планируем будущие мероприятия для ваших деток...</h2>
              ) : (
                futureEvents &&
                futureEvents.map((event) => (
                  <EventCard
                    uuid={event.uuid}
                    key={event.uuid}
                    eventName={event.eventName}
                    description={event.description}
                    age={event.age}
                    participants={event.participants}
                    totalSpots={event.totalSpots}
                    price={event.price}
                    durationLongerThanDay={event.durationLongerThanDay}
                    eventStart={event.eventStart}
                    eventEnd={event.eventEnd}
                  />
                ))
              )}
            </div>
            <div className='flex w-[80%] max-w-[400px] flex-col items-center justify-center sm:w-[70%] md:w-[60%] lg:w-[40%]'>
              <BeaverSleeps />
            </div>
          </>
        ) : null}
      </div>
      <span className={cn(baseClassName, 'left-20 top-[30%]')}>
        <Image src={cloud} alt='' />
      </span>
      <span className={cn(baseClassName, 'left-[20%] top-[5%]')}>
        <Image src={cloud2} alt='' />
      </span>
      <span className={cn(baseClassName, 'right-20 top-[50%]')}>
        <Image src={cloud3} alt='' />
      </span>
      <span className={cn(baseClassName, 'right-[10%] top-[10%]')}>
        <Image src={cloud4} alt='' />
      </span>
      <span className='eventsGradient absolute top-0 h-full w-screen' />
    </>
  );
};

export default FutureEvents;
