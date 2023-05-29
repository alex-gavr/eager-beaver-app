'use client';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { resetHomeLoader } from '@/services/homeLoaderSlice';
import { toDown, toUp } from '@/utils/motion-animations';
import logo from '@/images/logo.svg';
import { useEffect } from 'react';

const container = {
  visible: {
    opacity: 1,
    zIndex: 999,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const imageAni = {
  visible: (height = 500) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.5,
      },
      duration: 2,
    },
  }),
  hidden: {
    clipPath: 'circle(20px at 50% 50%)',
    opacity: 0,
  },
};

interface IProps {
  title: string;
  layoutId?: string;
}

const Loader = ({ title, layoutId }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);
  
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetHomeLoader());
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? (
        <AnimatePresence>
          <m.div
            className='fixed bottom-0 left-0 right-0 top-0 z-[1999] flex flex-col items-center justify-center gap-8 bg-primary-200 dark:bg-slate-950'
            variants={container}
            initial='hidden'
            animate='visible'
            exit='exit'
            // onAnimationComplete={handleDisableHomeAni}
          >
            <m.h2
              className='mx-2 rounded-2xl bg-accent-800 p-4 text-center text-3xl lowercase tracking-widest text-primary-200 dark:bg-accent-800 dark:text-primary-200 md:text-4xl'
              variants={imageAni}
              layoutId={layoutId}
            >
              {title}
            </m.h2>
            <m.div
              className='absolute top-5 flex w-full flex-col items-center justify-center overflow-hidden'
              variants={toDown}
            >
              <Image src={logo} alt='heroBeaver' />
            </m.div>
            {pathname !== '/' && (
              <m.h2
                className='absolute bottom-5 w-full text-center text-base tracking-wider text-slate-950 dark:text-slate-500 md:text-lg'
                variants={toUp}
              >
                Eager Beaver Language School
              </m.h2>
            )}
          </m.div>
        </AnimatePresence>
      ) : false}
    </>
  );
};

export default Loader;
