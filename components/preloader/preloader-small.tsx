import Image from 'next/image';
import { m } from 'framer-motion';

export const PreloaderSmall = () => {
  return (
    <m.div
      className='h-full w-full'
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Image src={'/time.svg'} alt='' width={40} height={40} />
    </m.div>
  );
};
