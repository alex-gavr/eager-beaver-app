'use client';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import FAQComponent from '@/components/faq/faq-component';
import { useAppSelector } from '@/services/hook';
import Loader from '@/components/Loader';
import { m } from 'framer-motion';
import { StyledMain, StyledSection } from '@/styles/StyledMain';
import { TFaq } from '@/db/schemas';

const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

const Wrapper = styled(StyledSection)({
  gap: '4rem',
  width: '95%',
  '@media only screen and (min-width: 60em)': {
    width: '80%',
  },
});

const StyledHeading = styled(m.h1)((props) => ({
  color: props.theme.colors.title,
  zIndex: 2,
  fontSize: 'clamp(2.4rem, 1.9487rem + 2.1880vw, 4rem)',
}));

const Accent = styled.span((props) => ({
  backgroundColor: props.theme.colors.primaryDark,
  color: props.theme.colors.black,
  padding: '0.5rem 1rem',
  borderRadius: '2rem',
}));

const YellowBackground = styled.span((props) => ({
  position: 'absolute',
  height: '300px',
  width: '100vw',
  borderRadius: '0 0 50% 50%',
  top: 0,
  backgroundColor: props.theme.colors.primaryLight,
}));

const Column = styled.div({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3rem',
  zIndex: 2,
  width: '100%',
});

interface IProps {
  faq: TFaq[];
}
const FAQ = ({ faq }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);
  return (
    <>
      {showLoader && <Loader title='Вопрос / Ответ' layoutId='faq' />}
      <StyledMain>
        <Wrapper>
          <StyledHeading layoutId='faq' transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Accent> Вопрос </Accent> / Ответ
          </StyledHeading>
          <Column>
            {faq.map((question) => (
              <FAQComponent key={question.id} question={question.question} description={question.description} />
            ))}
          </Column>
          <ActionButtons
            primaryButtonStyle='secondary'
            secondaryButtonStyle='emptyPrimary'
            showBackButton={true}
          />
          <YellowBackground />
        </Wrapper>
      </StyledMain>
    </>
  );
};

export default FAQ;
