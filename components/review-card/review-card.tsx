import Image from 'next/image';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ImageWithSkeleton } from '../image-with-skeleton/img-with-skeleton';
import { cn } from '@/utils/cn';

interface IProps {
  image: string;
  name: string;
  parent: string;
  relationToChild: string;
  review: string;
}

export const ReviewCard: FC<IProps> = ({ image, name, parent, relationToChild, review }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowY, setIsOverflowY] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const toggleClassName = () => {
    setShowFullText(!showFullText);
  };


  useLayoutEffect(() => {
    const p = ref.current;
    if (p) {
      const hasOverflowY = p.scrollHeight > p.clientHeight;
      setIsOverflowY(hasOverflowY);
    }
  }, [ref]);

  return (
    <AnimatePresence mode='wait' initial={false}>
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <div className='relative flex w-4/6 items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/3 '>
          <span className='absolute h-full w-full -translate-y-[15px] rounded-[200px] bg-dashed' />
          <div className='relative z-10 aspect-square overflow-hidden rounded-full bg-transparent shadow-md'>
            <ImageWithSkeleton
              className='pointer-events-none aspect-square bg-center object-cover'
              src={image}
              alt=''
            />
          </div>
        </div>
        <h2 className='text-slate-900 dark:text-slate-200'>{name}</h2>
        <div
          className='flex flex-col items-center justify-center gap-2 rounded-3xl bg-dashedCard p-4 tracking-widest'
          onClick={toggleClassName}
        >
          <div className='flex flex-col items-center justify-center gap-1'>
            <p> {parent}</p>
            <p>{relationToChild}</p>
          </div>
          <m.p className={cn(showFullText ? 'line-clamp-none' : 'line-clamp-4')} ref={ref}>
            {review}
          </m.p>
          {isOverflowY && (
            <div
              className='flex flex-col items-center justify-center p-2'
              style={showFullText ? { rotate: '180deg' } : {}}
            >
              <Image src={'/downArrow.svg'} width={30} height={20} alt='' />
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
