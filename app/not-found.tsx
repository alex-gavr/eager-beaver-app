export const runtime = 'nodejs'
'use client';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '@/components/buttons/button';
import { useRouter } from 'next/navigation';
import beaver from '@/images/beaver/scared.svg';
import { StyledMain } from '@/styles/StyledMain';
import { Metadata } from 'next';

const Wrapper = styled.section((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '2rem',
  marginBottom: '2rem',
  position: 'relative',
  '& > img': {
    width: '30%',
    height: '100%',
    '@media only screen and (max-width: 500px)': {
      width: '90%',
      height: '100%',
    },
    '@media only screen and (max-width: 800px) and (min-width: 501px)': {
      width: '60%',
      height: '100%',
    },
  },
  '& > h1': {
    color: props.theme.colors.title,
    textAlign: 'center',
  },
}));

const StyledImage = styled(Image)({
  width: '80%',
  '@media only screen and (min-width:50em)': {
    width: '40%',
  },
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '2rem',
  '@media only screen and (min-width: 50em)': {
    flexFlow: 'row nowrap',
  },
});

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const Custom404 = () => {
  const router = useRouter();
  return (
    <StyledMain>
      <Wrapper>
        <h1>Куда это вы забрели?</h1>
        <StyledImage src={beaver} alt='' />
        <ButtonContainer>
          <Button typeHTML='button' type='primary' onClick={() => router.push('/')}>
            На Главную{' '}
          </Button>
          <Button typeHTML='button' type='emptySecondary' onClick={() => router.back()}>
            Назад{' '}
          </Button>
        </ButtonContainer>
      </Wrapper>
    </StyledMain>
  );
};
export default Custom404;
