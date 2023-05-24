import { FC, useRef } from 'react';
import { ImageWithSkeleton } from '@/components/image-with-skeleton/img-with-skeleton';
import { AnimatePresence, m } from 'framer-motion';
import Carousel from 'react-multi-carousel-18';
import 'react-multi-carousel-18/lib/styles.css';
import { usePreventVerticalScroll } from '@/utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '@/components/custom-arrows/CustomArrows';
import styled from 'styled-components';
import { FlexCCC } from '@/styles/StyledMain';
import { useWindowSize } from 'usehooks-ts';
import { IEventsData } from '@/db/schemas';

const EvenColumns = styled(m.div)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '3rem',
  justifyItems: 'center',
  alignItems: 'center',
  minHeight: '25rem',
  borderRadius: '2rem',
  '@media only screen and (min-width: 1050px)': {
    gridTemplateColumns: '1fr 1fr',
    columnGap: '1rem',
  },
});
const ImageContainer = styled(FlexCCC)({
  borderRadius: '2rem',
  width: 'clamp(18.75rem, 13.6783rem + 24.5902vw, 37.5rem)',
  height: 'clamp(18.75rem, 13.6783rem + 24.5902vw, 37.5rem)',
  overflow: 'hidden',
  position: 'relative',
  willChange: 'transform',
  boxShadow: '0px -5px 10px rgba(50, 50, 93, 0.25), 0px 5px 10px rgba(50, 50, 93, 0.25)',
  pointerEvents: 'none',
  userSelect: 'none',
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const TextContainer = styled(FlexCCC)<any>((props) => ({
  gap: '2rem',
  order: props.order,
  '& > p': {
    textAlign: 'center',
  },
}));
const SubHeading = styled(m.h2)((props) => ({
  backgroundColor: props.theme.colors.primaryDark,
  padding: '0.5rem 1rem',
  borderRadius: '1.5rem',
  color: props.theme.colors.title,
  textTransform: 'uppercase',
  letterSpacing: '0.07rem',
  textAlign: 'center',
}));

const CarouselContainer = styled(FlexCCC)<any>(({ order }) => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  order: order,
  // That's dots in Carousel
  '& > ul': {
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
  width: '100%',
  height: '100%',
  position: 'relative',
  paddingTop: '1rem',
  paddingBottom: '4rem',
  // Carousel item
  '& > ul > li': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '@media only screen and (min-width:1050px)': {
    paddingBottom: '5rem',
  },
});

interface IProps extends Omit<IEventsData, 'id'> {
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
      <EvenColumns
        whileInView={{ x: 0, opacity: 1 }}
        initial={{
          x: rndInt === 1 ? -100 : 100,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        viewport={{ margin: '-20% 0px -20% 0px' }}
      >
        <CarouselContainer ref={ref} order={width < 1050 ? 2 : imageSide === 'left' ? 1 : 2}>
          <StyledCarousel
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
          >
            {images.map((image, index) => (
              <ImageContainer key={index}>
                <ImageWithSkeleton src={image.image} alt={alt} />
              </ImageContainer>
            ))}
          </StyledCarousel>
        </CarouselContainer>
        <TextContainer order={width < 1050 ? 1 : imageSide === 'left' ? 2 : 1}>
          <SubHeading>{heading}</SubHeading>
          <m.p>{paragraph}</m.p>
        </TextContainer>
      </EvenColumns>
    </AnimatePresence>
  );
};
