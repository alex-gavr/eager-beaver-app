'use client'; // Error components must be Client Components

import Button from '@/components/buttons/button';
import { StyledMain } from '@/styles/StyledMain';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import beaver from '@/images/beaver/scared.svg';

const Wrapper = styled.section((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '2rem',
  marginBottom: '2rem',
  position: 'relative',
  minHeight: '80vh',
  '& > img': {
    width: '30%',
    height: '100%',
    '@media only screen and (max-width: 500px)': {
      width: '60%',
      height: '100%',
    },
    '@media only screen and (max-width: 800px) and (min-width: 501px)': {
      width: '50%',
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

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <StyledMain>
      <Wrapper>
        <h1>Произошла ошибка</h1>
        <StyledImage src={beaver} alt='beaver' />
        <ButtonContainer>
          <Button typeHTML='button' type='primary' onClick={() => reset()}>
            Попробовать Снова
          </Button>
          <Button typeHTML='button' type='emptySecondary' onClick={() => router.back()}>
            Назад
          </Button>
        </ButtonContainer>
      </Wrapper>
    </StyledMain>
  );
}
