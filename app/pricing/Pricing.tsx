'use client';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { IPrices } from '@/types/data';
import SwiperCards from '@/components/prices/SwiperCards';
import { useAppSelector } from '@/services/hook';
import Loader from '@/components/Loader';
import { m } from 'framer-motion';
import { FlexCCC, StyledMain, StyledSection } from '@/styles/StyledMain';
import { TPrices } from '@/db/schemas';

const SidePopUp = dynamic(() => import('@/components/prices/side-popup/SidePopUp'), {
  ssr: false,
});
const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

const HeadingContainer = styled(FlexCCC)((props) => ({
  '& > h1': {
    color: props.theme.colors.primaryDark,
  },
  '& > h2': {
    color: props.theme.colors.secondaryDark,
    marginBottom: '2rem',
    zIndex: 2,
    textAlign: 'center',
  },
}));

const SwiperContainer = styled(FlexCCC)({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '50vh',
  marginBottom: '3rem',
});
const YellowBG = styled.span((props) => ({
  position: 'absolute',
  height: '60%',
  width: '100vw',
  borderRadius: '40% 40% 0 0',
  bottom: 0,
  backgroundColor: props.theme.colors.primaryLight,
}));

// export interface IFeature {
//   text: string;
// }

// export interface IPricesAdjustedArray {
//   mainArray: IPrices;
//   features: IFeature[][];
// }
// [];

interface IProps {
  prices: TPrices[];
}
const Pricing = ({ prices }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);

  return (
    <>
      {showLoader && <Loader title='Тарифы' layoutId='prices' />}
      <StyledMain>
        <StyledSection>
          <HeadingContainer>
            <m.h1 layoutId='prices' transition={{ duration: 0.6, ease: 'easeOut' }}>
              Тарифы
            </m.h1>
            <h2>выбирай подходящий и приходи учиться</h2>
          </HeadingContainer>
          <SwiperContainer>
            <SwiperCards prices={prices} />
          </SwiperContainer>
          <ActionButtons
            primaryButtonStyle='secondary'
            secondaryButtonStyle='emptyPrimary'
            showBackButton={true}
          />
          <YellowBG />
        </StyledSection>
        <SidePopUp />
      </StyledMain>
    </>
  );
};

export default Pricing;
