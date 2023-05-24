'use client';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { useAppSelector } from '@/services/hook';
import { StyledMain, StyledSection } from '@/styles/StyledMain';
import { TFutureEvents } from '@/db/schemas';

const FutureEvents = dynamic(() => import('@/components/future-events/FutureEvents'));
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

interface IProps {
  futureEvents: TFutureEvents[];
}

const Schedule = ({ futureEvents }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);
  return (
    <>
      {showLoader && <Loader title='Предстоящие мероприятия' layoutId='futureEvents' />}
      <StyledMain>
        <StyledSection style={{ width: '100vw' }}>
          <FutureEvents layoutId='futureEvents' futureEvents={futureEvents} />
        </StyledSection>
      </StyledMain>
    </>
  );
};

export default Schedule;
