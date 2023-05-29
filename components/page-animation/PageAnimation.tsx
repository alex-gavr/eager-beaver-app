'use client';
import { m, useIsPresent } from 'framer-motion';
import { useState } from 'react';


const PageAnimation = () => {
  const isPresent = useIsPresent();
  const [number, setNumber] = useState<number | null>(null);

  if (number === null) {
    setNumber(Math.floor(Math.random() * 2) + 1);
  }

  return (
    <m.div
      className='modalGradient absolute bottom-0 left-0 right-0 top-0 z-[999]'
      initial={number === 1 ? { scaleX: 1 } : { scaleX: 1 }}
      animate={
        number === 1
          ? { scaleX: 0, transition: { duration: 1, ease: 'circOut' } }
          : { scaleX: 0, transition: { duration: 1, ease: 'circOut' } }
      }
      exit={
        number === 1
          ? { scaleX: 1, transition: { duration: 1, ease: 'circOut' } }
          : { scaleX: 1, transition: { duration: 1, ease: 'circOut' } }
      }
      style={number === 1 ? { originX: isPresent ? 0 : 1 } : { originX: isPresent ? 1 : 0 }}
    />
  );
};

export default PageAnimation;
