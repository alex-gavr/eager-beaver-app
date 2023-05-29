'use client'
import { FC } from 'react';
import TeachingSteps from './teaching-steps/TeachingSteps';
import { AnimatePresence, m } from 'framer-motion';
import { list, opacity, toLeft, toRight } from '@/utils/motion-animations';
import AnimatedTextWords from '@/components/AnimatedTextWords/AnimatedTextWords';
import Image from 'next/image';
import { baseClassName } from '@/components/CloudsContainer';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import cloud from '@/images/clouds/5.svg';
import cloud2 from '@/images/clouds/2.svg';
import { cn } from '@/utils/cn';

const BeaverHiOptimized = dynamic(() => import('./BeaverHi'));

const TeachProcess: FC = (): JSX.Element => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <AnimatePresence>
      <m.section
        className='relative mt-12 flex w-full max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'
        ref={ref}
        variants={list}
        whileInView='visible'
        initial='hidden'
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      >
        <h1>
          <AnimatedTextWords title={true} text='Как проходит обучение?' textAnimation='fromBottomLeft' />
        </h1>
        <m.div
          className='z-[100] mb-20 grid w-full max-w-6xl grid-cols-1 justify-center gap-4 md:w-screen md:grid-cols-2 md:gap-8'
          variants={opacity}
        >
          <TeachingSteps />
          <div className='flex flex-col items-center justify-start'>
            <BeaverHiOptimized />
          </div>
        </m.div>
        {inView ? (
          <>
            <span className='absolute top-0 h-full w-[200vw] rounded-[50%] bg-primary-200 dark:bg-neutral-900' />
            <m.span
              className={cn(baseClassName, 'left-0 top-[10%]')}
              variants={toRight}
              whileInView='visible'
              initial='hidden'
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            >
              <Image src={cloud} alt='' />
            </m.span>
            <m.span
              className={cn(baseClassName, 'bottom-[1%] left-[30%]')}
              variants={toLeft}
              whileInView='visible'
              initial='hidden'
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            >
              <Image src={cloud2} alt='cloud2' />
            </m.span>
          </>
        ) : null}
      </m.section>
    </AnimatePresence>
  );
};

export default TeachProcess;
