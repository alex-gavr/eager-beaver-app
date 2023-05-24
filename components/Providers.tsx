'use client'
import { Provider } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyMotion } from 'framer-motion';
import { store } from '@/services/store';


interface IProps {
    children: React.ReactNode;
    themeMode: DefaultTheme;
}

const Providers = ({ children, themeMode }: IProps) => {
    
    return (
        <ThemeProvider theme={themeMode}>
            <LazyMotion features={async () => (await import('@/lib/domAnimation')).default}>
                <Provider store={store}>
                    <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
                        {children}
                    </SkeletonTheme>
                </Provider>
            </LazyMotion>
        </ThemeProvider>
    );
};

export default Providers;
