'use client';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import TeacherCard from '@/components/teacher-card/teacher-card';
import Loader from '@/components/Loader';
import { useAppSelector } from '@/services/hook';
import { StyledMain, StyledSection } from '@/styles/StyledMain';
import { TTeachers } from '@/db/schemas';
import { m } from 'framer-motion';

const ActionButtons = dynamic(
  () => import('../../components/buttons/action-buttons-page-end/ActionButtons'),
  {
    ssr: false,
  },
);
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const Accent = styled.span((props) => ({
  backgroundColor: props.theme.colors.secondaryDark,
  borderRadius: '1rem',
  padding: '0.2rem 0.5rem',
  color: props.theme.colors.title,
}));

const StyledTeachersContainer = styled.div({
  display: 'grid',
  gap: '3rem 2rem',
  justifyItems: 'center',
  alignItems: 'flex-start',
  '@media only screen and (min-width: 60em)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

interface IProps {
  teachers: TTeachers[];
}

const Teachers = ({ teachers }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);

  return (
    <>
      {showLoader && <Loader title='Наши преподаватели' layoutId='ourTeachers' />}
      <StyledMain>
        <StyledSection>
          <m.h1
            style={{ textAlign: 'center', lineHeight: '1.6' }}
            layoutId='ourTeachers'
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Наши <Accent>преподаватели</Accent>
          </m.h1>
          <StyledTeachersContainer>
            {teachers &&
              teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  image={teacher.image}
                  alt={teacher.fullName}
                  name={teacher.fullName}
                  description={teacher.description}
                  includePlay={true}
                />
              ))}
          </StyledTeachersContainer>
          <ActionButtons
            primaryButtonStyle='primary'
            secondaryButtonStyle='emptySecondary'
            showBackButton={true}
          />

        </StyledSection>

      </StyledMain>
    </>
  );
};

export default Teachers;
