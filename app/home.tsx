'use client';
import Hero from '@/components/home/Hero';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/services/hook';
import Loader from '@/components/Loader';
import { StyledMain, StyledSection } from '@/styles/StyledMain';
import { IEventsData, TFutureEvents } from '@/db/schemas';

const TeachProcess = dynamic(() => import('@/components/home/teach-process/teach-process'), {
  ssr: false,
});
const FutureEvents = dynamic(() => import('@/components/future-events/FutureEvents'), {
  ssr: false,
});
const Events = dynamic(() => import('@/components/home/thematic-events/events'));
const FreeClass = dynamic(() => import('@/components/home/free-class/free-class'), {
  ssr: false,
});
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));
const FlyingBeaver = dynamic(() => import('@/components/FlyingBeaver/FlyingBeaver'));

interface IProps {
  futureEvents: TFutureEvents[];
  themeEvents: IEventsData[];
}

const Home = ({ futureEvents, themeEvents }: IProps) => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);

  return (
    <>
      {showLoader ? (
        <Loader title='Eager Beaver Language School' layoutId='eagerBeaverLanguageSchool' />
      ) : (
        false
      )}
      <StyledMain>
        <FlyingBeaver />
        <Hero />
        <TeachProcess />
        <Events themeEvents={themeEvents} />
        <StyledSection style={{ width: '100vw' }}>
          <FutureEvents futureEvents={futureEvents} />
        </StyledSection>
        <FreeClass />
      </StyledMain>
    </>
  );
};
export default Home;
