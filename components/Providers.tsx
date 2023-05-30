'use client';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyMotion } from 'framer-motion';
import { AppProvider } from '@/context/Context';

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <LazyMotion features={async () => (await import('@/lib/domAnimation')).default}>
      <AppProvider>
        <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
          {children}
        </SkeletonTheme>
      </AppProvider>
    </LazyMotion>
  );
};

export default Providers;
