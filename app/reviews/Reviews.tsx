'use client'
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ReviewCard } from '@/components/review-card/review-card';
import 'react-multi-carousel-18/lib/styles.css';
import { usePreventVerticalScroll } from '@/utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '@/components/custom-arrows/CustomArrows';
import Carousel from 'react-multi-carousel-18';
import Loader from '@/components/Loader';
import { TReviews } from '@/db/schemas';

const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));


interface IProps {
  reviews: TReviews[];
}
const Reviews = ({ reviews }: IProps) => {
  const ref = useRef(null);
  const slider = usePreventVerticalScroll(ref);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  const dotStyles =
    'w-[40%] flex flex-row flex-wrap z-10 !bottom-2 !left-[50%] !-translate-x-[50%] lg:w-full lg:bottom-2 lg:left-0 transform-none';

  return (
    <>
      <Loader title='Наши Ученики' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section
          className='relative flex min-h-screen max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'
          ref={ref}
        >
          <h1 className='z-10 text-center text-accent-800 dark:text-accent-800 text-4xl md:text-5xl xl:text-5xl'>
            Наши{' '}
            <span className='rounded-xl bg-accent-800 px-4 py-1 text-slate-900 dark:bg-accent-800 dark:text-slate-900'>
              ученики
            </span>
          </h1>
          <div className='relative flex w-screen flex-col items-center justify-center p-4'>
            <Carousel
              showDots={true}
              responsive={responsive}
              infinite={true}
              arrows={true}
              ssr={true}
              customLeftArrow={<LeftArrow />}
              customRightArrow={<RightArrow />}
              customTransition='transform 400ms ease-in-out'
              transitionDuration={1000}
              renderDotsOutside={true}
              className='w-screen z-[1] mb-4'
              dotListClass={dotStyles}
              itemClass='pt-4 px-4 pb-4 select-none xl:pt-4 xl:pb-4 xl:px-4'
            >
              {reviews &&
                reviews.map((review) => (
                  <ReviewCard
                    key={review.uuid}
                    image={review.image}
                    name={review.childName}
                    parent={review.parentName}
                    relationToChild={review.relationToChild}
                    review={review.review}
                  />
                ))}
            </Carousel>
          </div>
          {Carousel ? (
            <ActionButtons
              variantPrimary='secondary'
              variantBack='defaultGhost'
              showBackButton={true}
            />
          ) : null}
          <span className='absolute top-0 h-full w-screen bg-primary-200 dark:bg-slate-900' />
        </section>
      </main>
    </>
  );
};

export default Reviews;
