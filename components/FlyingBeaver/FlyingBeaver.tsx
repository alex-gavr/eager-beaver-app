import Image from 'next/image';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
// import beaverRocket from '../../images/beaver/BeaverRocket.svg';
import beaverRocket from '@/images/beaver/BeaverRocket.svg';
import { FlexCCC } from '@/styles/StyledMain';
import { useWindowSize } from 'usehooks-ts';

interface IProps {
  width?: string;
  rotate?: string;
}

const StyledDiv = styled(FlexCCC)<any>(({ width, rotate }) => ({
  position: 'absolute',
  zIndex: 999,
  top: '110vh',
  right: '-2rem',
  width: width,
  willChange: 'transform',
  '& > img': {
    width: '100%',
    height: '100%',
    rotate: rotate,
  },
}));

const FlyingBeaver = () => {
  const { width } = useWindowSize();
  return (
    <AnimatePresence>
      <StyledDiv
        width={width < 400 ? '40%' : width < 700 ? '20%' : '10rem'}
        rotate={width < 400 ? '55deg' : '40deg'}
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
        <Image src={beaverRocket} alt='' loading='eager' />
      </StyledDiv>
    </AnimatePresence>
  );
};

export default FlyingBeaver;
