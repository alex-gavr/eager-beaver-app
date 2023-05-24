'use client';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ReviewCard } from '@/components/review-card/review-card';
import 'react-multi-carousel-18/lib/styles.css';
import { usePreventVerticalScroll } from '@/utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '@/components/custom-arrows/CustomArrows';
import Carousel from 'react-multi-carousel-18';
import { useAppSelector } from '@/services/hook';
import Loader from '@/components/Loader';
import { m } from 'framer-motion';
import { FlexCCC, StyledMain, StyledSection } from '@/styles/StyledMain';
import { TReviews } from '@/db/schemas';

const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

const StyledHeading = styled(m.h1)((props) => ({
  color: props.theme.colors.secondaryDark,
  width: '80%',
  textAlign: 'center',
}));
const YellowBackground = styled.span((props) => ({
  position: 'absolute',
  height: '100%',
  width: '100vw',
  top: 0,
  backgroundColor: props.theme.colors.primaryLight,
}));

const Accent = styled.span((props) => ({
  backgroundColor: props.theme.colors.secondaryDark,
  padding: '0.1rem 1rem',
  borderRadius: '1.5rem',
  color: props.theme.colors.title,
  transition: 'all 0.5s ease-in-out',
}));
const CarouselContainer = styled(FlexCCC)((props) => ({
  width: '100vw',
  position: 'relative',
  padding: '1rem',
  // That's dots in Carousel
  '& > ul': {
    zIndex: 3,
    width: '40%',
    flexFlow: 'row wrap',
    left: '50% !important',
    bottom: '2% !important',
    transform: 'translateX(-50%)',
    '@media only screen and (min-width:1050px)': {
      width: '100%',
      bottom: '2% !important',
      left: '0 !important',
      transform: 'none',
    },
  },
}));
const StyledCarousel = styled(Carousel)({
  width: '100vw',
  zIndex: 1,
  marginBottom: '1rem',
  '& > ul > li': {
    padding: '1rem 1rem 3.5rem 1rem',
    userSelect: 'none',
    '@media only screen and (min-width: 80em)': {
      padding: '1rem 2rem 2rem 2rem',
    },
  },
});

interface IProps {
  reviews: TReviews[];
}
const Reviews = ({ reviews }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);
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

  return (
    <>
      {showLoader && <Loader title='Наши Ученики' layoutId='kids' />}
      <StyledMain>
        <StyledSection ref={ref} style={{ minHeight: '100vh' }}>
          <StyledHeading layoutId='kids' transition={{ duration: 0.6, ease: 'easeOut' }}>
            Наши <Accent>ученики</Accent>
          </StyledHeading>
          <CarouselContainer>
            <StyledCarousel
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
            >
              {reviews &&
                reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    image={review.image}
                    name={review.childName}
                    parent={review.parentName}
                    relationToChild={review.relationToChild}
                    review={review.review}
                  />
                ))}
            </StyledCarousel>
          </CarouselContainer>
          {Carousel ? (
            <ActionButtons
              primaryButtonStyle='secondary'
              secondaryButtonStyle='emptySecondary'
              showBackButton={true}
            />
          ) : null}
          <YellowBackground />
        </StyledSection>
      </StyledMain>
    </>
  );
};

export default Reviews;
