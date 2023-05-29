'use client';
import { list, popUp } from '@/utils/motion-animations';
import { m } from 'framer-motion';
interface ICreditsProps {}

const Credits = ({}: ICreditsProps) => {
  return (
    <m.div
      className='flex w-screen flex-col items-center justify-center gap-4 bg-accent-800 p-4 dark:bg-accent-800'
      variants={list}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-5% 0px -5% -0px' }}
    >
      <m.p className='text-xs tracking-widest sm:text-sm dark:text-slate-800' variants={popUp}>
        Product Owner: Валерия Евстратова
      </m.p>
      <m.div
        className='grid grid-cols-2 justify-items-center gap-4 text-left capitalize tracking-wider lg:grid-cols-4'
        variants={list}
      >
        <m.p className='text-xs tracking-widest sm:text-sm dark:text-slate-800' variants={popUp}>
          Design: Мария Рязанова
        </m.p>
        <m.p className='text-xs tracking-widest sm:text-sm dark:text-slate-800' variants={popUp}>
          Development: Александр Гавриленко
        </m.p>
        <m.p className='text-xs tracking-widest sm:text-sm dark:text-slate-800' variants={popUp}>
          Photography: Диана Удаева
        </m.p>
        <m.p className='text-xs tracking-widest sm:text-sm dark:text-slate-800' variants={popUp}>
          Illustrations: Елизавета Шведова
        </m.p>
      </m.div>
    </m.div>
  );
};

export default Credits;
