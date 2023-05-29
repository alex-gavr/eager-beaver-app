'use client'
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
// import beaverRocket from '../../images/beaver/BeaverRocket.svg';
import beaverRocket from '@/images/beaver/BeaverRocket.svg';
import { useWindowSize } from 'usehooks-ts';
import { cn } from '@/utils/cn';
import { m } from 'framer-motion';

const FlyingBeaver = () => {
  const { width } = useWindowSize();
  return (
    <AnimatePresence>
      <m.div
        className={cn(
          'absolute -right-[2rem] top-[110vh] z-[999]',
          width < 400 ? 'w-[40%]' : width < 700 ? 'w-[20%]' : 'w-[10rem]',
        )}
        animate={{
          x: width < 400 ? '-100vw' : '-100vw',
          y: width < 400 ? '-180vh' : '-180vh',
          transition: {
            duration: 4.5,
            delay: 3,
            ease: 'easeIn',
          },
        }}
      >
        <Image
          src={beaverRocket}
          alt=''
          loading='eager'
          className={cn(width < 400 ? 'rotate-[55deg]' : 'rotate-[40deg]')}
        />
      </m.div>
    </AnimatePresence>
  );
};

export default FlyingBeaver;
