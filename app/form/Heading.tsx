'use client'
// import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';

interface IHeadingProps {
  event: boolean;
}

const Heading = ({ event }: IHeadingProps) => {
  // const eventName = cookies().get('event')?.value;
  const eventName = getCookie('event');
  return (
    <>
      {event ? (
        <h2 className='text-center text-lg leading-relaxed text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-3xl'>
          Позвольте связаться с Вами для подтверждения записи на <br />
          <span className='rounded-lg bg-primary-500 px-4 py-1 text-accent-800 dark:bg-primary-500 dark:text-accent-800'>
            {eventName}
          </span>
        </h2>
      ) : (
        <h2 className='mb-2 text-center text-3xl leading-relaxed text-slate-800 dark:text-slate-200 lg:mb-4 lg:text-4xl'>
          Пробное Занятие{' '}
          <span className='rounded-lg bg-primary-500 px-4 py-2 text-accent-800 dark:bg-primary-500 dark:text-accent-800'>
            Бесплатно
          </span>
        </h2>
      )}
    </>
  );
};

export default Heading;
