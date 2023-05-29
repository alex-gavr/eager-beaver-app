import { useSwiper } from 'swiper/react';
import Image from 'next/image';

export const SlideButtons = () => {
  const swiper = useSwiper();

  return (
    <div className='flex h-full w-4/5 items-center justify-between sm:w-2/5'>
      <span
        className='flex h-[50px] w-[50px] select-none flex-col items-center justify-center rounded-full bg-slate-950 bg-opacity-50 p-1 dark:bg-slate-950 dark:bg-opacity-50'
        onClick={() => swiper.slidePrev()}
      >
        <Image src={'/downArrow.svg'} width={25} height={15} alt='' style={{ rotate: '90deg' }} />
      </span>
      <div
        className='flex h-[50px] w-[50px] select-none flex-col items-center justify-center rounded-full bg-slate-950 bg-opacity-50 p-1 dark:bg-slate-950 dark:bg-opacity-50'
        onClick={() => swiper.slideNext()}
      >
        <Image src={'/downArrow.svg'} width={25} height={15} alt='' style={{ rotate: '-90deg' }} />
      </div>
    </div>
  );
};
