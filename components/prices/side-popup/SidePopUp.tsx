'use client';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';

const initial = {
  opacity: 0,
  x: 100,
  transition: {
    duration: 1.5,
    type: 'spring',
  },
};
const animate = {
  opacity: 1,
  x: 0,
  transition: {
    duration: 1.5,
    delay: 1,
    type: 'spring',
  },
};
const exit = {
  opacity: 0,
  x: 100,
  transition: {
    duration: 1.5,
    type: 'spring',
  },
};

const SidePopUp = () => {
  const [tutorialSeen, setTutorialSeen] = useState(false);
  return (
    <AnimatePresence mode='wait'>
      {!tutorialSeen && (
        <m.div
          className='hidden md:absolute md:right-5 md:top-5 md:z-10 md:flex md:flex-col md:items-center md:justify-center md:gap-4 md:rounded-2xl md:bg-accent-200 md:px-4 md:pb-4 md:pt-6 md:shadow-lg md:dark:bg-accent-200'
          initial={initial}
          animate={animate}
          exit={exit}
        >
          <div className='flex w-full flex-col items-center justify-center'>
            <h2 className='mb-2 text-slate-900 dark:text-slate-900'>Обучение</h2>
            <video width='285' height='180' muted autoPlay playsInline loop>
              <source src={'/tutorial.mp4'} type='video/mp4' />
            </video>
          </div>
          <div
            className='flex w-full flex-col items-center justify-center'
            onClick={() => setTutorialSeen(true)}
          >
            <Image
              className='w-14 rounded-md bg-accent-800 p-2 dark:bg-accent-800'
              src={'/ok.svg'}
              width={20}
              height={20}
              alt=''
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default SidePopUp;
