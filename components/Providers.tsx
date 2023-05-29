'use client';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyMotion } from 'framer-motion';
import { store } from '@/services/store';

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <LazyMotion features={async () => (await import('@/lib/domAnimation')).default}>
      <Provider store={store}>
        <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
          {children}
        </SkeletonTheme>
      </Provider>
    </LazyMotion>
  );
};

export default Providers;
