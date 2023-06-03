'use client';
import { AnimatePresence, m } from 'framer-motion';
import { footer } from '../links';
import { list, listFooterUl, opacity, popUp, toDown, toUp } from '@/utils/motion-animations';
import beaverRocket from '@/images/beaver/BeaverRocket.svg';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SocialMediaIcons from '@/components/social-media-block/SocialMediaIcons';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useInView } from 'react-intersection-observer';
import Policy from './Policy';
import Credits from './Credits';
import { useAppContext } from '@/context/Context';
import { ActionsType } from '@/context/actionsTypes';

const SchoolLocationMap = dynamic(() => import('@/components/map/map'), {
  ssr: false,
  loading: () => (
    <div style={{ placeSelf: 'center', width: 300, height: 300 }}>
      <Skeleton width={300} height={300} />
    </div>
  ),
});

const Footer = () => {
  const [showMap, setShowMap] = useState(false);
  // const dispatch = useAppDispatch();
  const { dispatch } = useAppContext();

  const { ref, inView } = useInView({});

  useEffect(() => {
    dispatch({ type: ActionsType.setFooterVisibility, payload: inView });
    if (!showMap && inView) {
      setShowMap(true);
    }
  }, [inView]);

  return (
    <AnimatePresence>
      <footer
        className='relative flex min-h-[5px] w-screen flex-col items-center justify-center bg-slate-950 dark:bg-neutral-900'
        ref={ref}
      >
        {inView ? (
          <>
            <m.div
              className='flex w-full flex-col flex-nowrap items-center justify-center gap-4 p-8 sm:flex-row sm:justify-end'
              variants={list}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-10% 0px -10% -0px' }}
            >
              <m.p className='text-slate-300 dark:text-slate-300' variants={opacity}>
                присоединяйся к нам и здесь
              </m.p>
              <m.div className='flex flex-row flex-nowrap items-center justify-center gap-5' variants={toUp}>
                <SocialMediaIcons />
              </m.div>
            </m.div>
            <div className='flex max-w-7xl flex-col items-center justify-evenly gap-8 p-4 lg:flex-row lg:flex-wrap lg:px-8 lg:py-10'>
              <div className='flex w-[98%] flex-col items-center justify-center gap-4 border-b-2 border-primary-200 py-8 lowercase tracking-wider lg:order-2 lg:w-5/6 lg:max-w-[800px] lg:flex-row lg:items-start lg:border-b-0 lg:border-t-2'>
                <div className='flex flex-col items-start justify-center gap-8 lowercase tracking-wider'>
                  <Image
                    className='order-1 h-52 w-52 -rotate-12 -scale-x-100 place-self-center lg:absolute lg:left-12 lg:top-4 lg:h-32 lg:w-32'
                    src={beaverRocket}
                    alt=''
                  />
                  <p className='order-2 text-slate-300 dark:text-slate-300 lg:order-1'>
                    Мы находимся по адресу: <br /> г. Волгоград, БЦ &quot;Меркурий&quot;, ул. Калинина, д. 13,
                    8-й этаж, офис 807
                  </p>
                  <p className='order-3 tracking-widest text-slate-300 dark:text-slate-300 lg:order-2'>
                    Телефон для связи:
                    <a href='tel:+7(909)380-96-57' className='text-slate-300 dark:text-slate-300'>
                      {' '}
                      +7(909)380-96-57
                    </a>
                  </p>
                </div>
                {showMap ? (
                  <SchoolLocationMap
                    style={{ placeSelf: 'center', width: 300, height: 300 }}
                    widthDesktop={300}
                    heightDesktop={300}
                    widthMobile={300}
                    heightMobile={300}
                  />
                ) : (
                  <Skeleton width={300} height={300} />
                )}
              </div>
              <m.ul
                className='grid w-full grid-flow-row grid-cols-2 grid-rows-4 place-items-start gap-y-10 place-self-start lg:flex lg:w-fit lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-10 '
                variants={listFooterUl}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-5% 0px -5% -0px' }}
              >
                {footer.map((link) => (
                  <m.li variants={toDown} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} key={link.id}>
                    <Link
                      className='p-2 text-xs tracking-widest text-slate-300 hover:rounded-md hover:bg-accent-200 hover:text-slate-700 dark:text-slate-300 hover:dark:text-slate-700 sm:text-sm'
                      href={link.to}
                    >
                      {link.name}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </div>
            <Credits />
            <Policy />
          </>
        ) : null}
      </footer>
    </AnimatePresence>
  );
};
export default Footer;
