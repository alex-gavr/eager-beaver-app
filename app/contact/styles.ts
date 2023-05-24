'use client';
import { FlexCCC } from '@/styles/StyledMain';
import { styled } from 'styled-components';
import { m } from 'framer-motion';

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  justifyItems: 'center',
  gap: '2rem',
  '@media only screen and (min-width: 900px)': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
  },
});

export const ContactDetails = styled(FlexCCC)({
  alignItems: 'flex-start',
  width: '90%',
  gap: '1rem',
  position: 'relative',
  order: 1,
  '@media only screen and (min-width: 900px)': {
    order: 2,
  },
});

export const IconsContainer = styled(FlexCCC)({
  flexFlow: 'row nowrap',
  gap: '1.2rem',
  overflow: 'hidden',
  zIndex: 2,
});

export const Heading = styled(m.h1)((props) => ({
  color: props.theme.colors.title,
}));
export const SubHeading = styled.h2((props) => ({
  color: props.theme.colors.title,
}));
