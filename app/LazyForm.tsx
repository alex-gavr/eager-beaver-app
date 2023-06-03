'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import beaver from '@/images/logo.svg';
import Form from './form/Form';

interface ILazyFormProps {}

const LazyForm = ({}: ILazyFormProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <div className='flex flex-col items-center justify-center py-10' id='form' ref={ref}>
      {inView ? (
        <>
          <h1 className='text-center text-4xl  leading-normal text-slate-900 dark:text-slate-300 lg:text-5xl'>
            Получите пробное занятие{' '}
            <span className='rounded-3xl bg-accent-800 px-5 py-1 text-neutral-900 dark:bg-accent-800 dark:text-primary-200'>
              бесплатно
            </span>
          </h1>
          <div className='flex w-full flex-col items-center justify-center gap-12 lg:flex-row'>
            <div className='flex w-[60%] flex-shrink-0 flex-col items-center justify-center lg:w-[40%]'>
              <Image src={beaver} alt='hello' className='w-full' />
            </div>
            <Form />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default LazyForm;
