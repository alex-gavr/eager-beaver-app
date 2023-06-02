'use client';
import { useRef } from 'react';
import { ImageWithSkeleton } from '@/components/image-with-skeleton/img-with-skeleton';
import { AnimatePresence, m } from 'framer-motion';
import Carousel from 'react-multi-carousel-18';
import 'react-multi-carousel-18/lib/styles.css';
import { usePreventVerticalScroll } from '@/utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '@/components/custom-arrows/CustomArrows';
import { useWindowSize } from 'usehooks-ts';
import { IEventsData } from '@/db/schemas';
import { cn } from '@/utils/cn';

interface IProps extends Omit<IEventsData, 'uuid'> {
  alt: string;
}

export const TwoColumns = ({ images, alt, imageSide, heading, paragraph }: IProps) => {
  const { width } = useWindowSize();
  const ref = useRef(null);
  const slider = usePreventVerticalScroll(ref);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const rndInt = Math.floor(Math.random() * 2) + 1;

  return (
    <AnimatePresence mode='wait'>
      <m.div
        className='grid min-h-[25rem] grid-cols-1 items-center justify-center gap-12 gap-x-4 rounded-3xl lg:grid-cols-2'
        whileInView={{ x: 0, opacity: 1 }}
        initial={{
          x: rndInt === 1 ? -100 : 100,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        viewport={{ margin: '-20% 0px -20% 0px' }}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden',
            width < 1024 ? 'order-2' : imageSide === 'left' ? 'order-1' : 'order-2',
          )}
          ref={ref}
        >
          <Carousel
            className='relative h-full w-full pb-16 pt-4 lg:pb-20 '
            showDots={true}
            responsive={responsive}
            arrows={true}
            ssr={true}
            customLeftArrow={<LeftArrow alwaysBottom={true} />}
            customRightArrow={<RightArrow alwaysBottom={true} />}
            infinite={true}
            renderDotsOutside={true}
            customTransition='transform 400ms ease-in-out'
            transitionDuration={1000}
            itemClass='flex item-center justify-center'
            dotListClass='w-[40%] flex-row flex-wrap !left-[50%] !bottom-[2%] !-translate-x-[50%] lg:w-[100%] !lg:left-0 !lg:bottom-[2%] transform-none'
          >
            {images.map((image, index) => (
              <div
                className=' pointer-events-none relative flex h-72 w-72 select-none flex-col items-center justify-center overflow-hidden rounded-[2rem] shadow-2xl will-change-transform sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem]'
                key={index}
              >
                <ImageWithSkeleton className='min-h-full min-w-full flex-shrink-0 object-cover' src={image.image} alt={alt} />
              </div>
            ))}
          </Carousel>
        </div>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-8',
            width < 1050 ? 'order-1' : imageSide === 'left' ? 'order-2' : 'order-1',
          )}
        >
          <h2 className='rounded-3xl bg-primary-800 px-4 py-2 text-center uppercase tracking-wider dark:bg-primary-800 dark:text-slate-950 text-2xl md:text-3xl lg:text-4xl'>
            {heading}
          </h2>
          <p className='text-center'>{paragraph}</p>
        </div>
      </m.div>
    </AnimatePresence>
  );
};
