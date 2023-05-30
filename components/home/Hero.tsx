'use client'
import { useEffect, useState } from 'react';
import hero from '@/images/hero/heroDesktop.webp';
import heroMobile from '@/images/hero/mobileHero.webp';
import { AnimatePresence, m } from 'framer-motion';
import { toRight, toDown, popUp, list, toUp, opacity } from '@/utils/motion-animations';
import Image from 'next/image';
import ActionButtons from '../buttons/action-buttons-page-end/ActionButtons';
import { getCookie } from 'cookies-next';
import { useWindowSize } from 'usehooks-ts';
// import StyledLink from '../StyledLink/StyledLink';
import { useAppContext } from '@/context/Context';

const Hero = () => {
  const { width } = useWindowSize();
  const { state } = useAppContext();
  const [name, setName] = useState<string | undefined>('');

  useEffect(() => {
    const cookie = getCookie('name') as string;

    if (cookie) {
      setName(cookie);
    }
  }, []);

  return (
    <AnimatePresence>
      <section className='relative grid min-h-[90vh] w-full grid-cols-1 justify-items-center sm:grid-cols-4'>
        <m.div
          className='absolute bottom-0 left-0 right-0 top-0'
          layoutId='hero'
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <Image
            fill
            className='object-cover'
            loading='eager'
            src={width < 480 ? heroMobile : hero}
            alt='hero image'
          />
        </m.div>
        {!state.loaderVisible && (
          <m.div
            className='z-10 flex max-w-[350px] flex-col items-start justify-start px-2 sm:ml-8 sm:max-w-lg sm:items-center sm:justify-center sm:col-span-3 md:col-span-2'
            variants={list}
            animate='visible'
            initial='hidden'
          >
            <m.div className='mt-4 flex w-full flex-col items-start justify-center gap-8'>
              <m.p
                className='text-base capitalize tracking-wider text-slate-700 dark:text-slate-700'
                variants={opacity}
              >
                {name && `с возвращением, ${name}`}
              </m.p>
              <m.h1
                className='text-center text-4xl tracking-wider text-primary-800 shadow-slate-950 text-shadow dark:text-primary-800 sm:text-left sm:text-4xl sm:leading-snug md:text-5xl md:leading-snug'
                variants={toDown}
              >
                Eager Beaver Language School
              </m.h1>
              <div className='flex flex-col items-start justify-center gap-2 md:w-4/5'>
                <m.p
                  className='text-lg tracking-wider text-neutral-200 shadow-slate-800 text-shadow dark:text-neutral-200 md:text-xl'
                  variants={toRight}
                >
                  детская языковая школа
                </m.p>
                <m.p
                  className='text-lg tracking-wider text-neutral-200 shadow-slate-800 text-shadow dark:text-neutral-200 md:text-xl'
                  variants={toUp}
                >
                  помогаем вашему ребенку любить иностранные языки с детства
                </m.p>
              </div>
              <m.div
                className='absolute bottom-5 left-0 right-0 sm:relative sm:mt-8 sm:flex sm:flex-col sm:items-center sm:justify-center'
                variants={popUp}
              >
                <ActionButtons className='lowercase' rounded={'xl'} variantPrimary={'hero'} showBackButton={false} />
              </m.div>
            </m.div>
          </m.div>
        )}
      </section>
    </AnimatePresence>
  );
};

export default Hero;
