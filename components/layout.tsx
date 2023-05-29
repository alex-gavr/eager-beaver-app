'use client';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
import { Analytics } from '@vercel/analytics/react';
import Skeleton from 'react-loading-skeleton';
import Header from './menus/header/header';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import production from '@/utils/isProd';

const FixedSocialMedia = dynamic(() => import('@/components/social-media-block/FixedSocialMedia'), {
  ssr: false,
});
const DayNightToggle = dynamic(() => import('@/components/toggle'), {
  ssr: false,
});

const ImageLoadingError = dynamic(() => import('@/components/ImageLoadingError'), {
  ssr: false,
});

interface IProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

const Layout = ({ children, theme }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isModalOpen, submitSuccess, formFromModal, formFutureEvents, showPolicy } = useAppSelector(
    (state) => state.modal,
  );
  const { error } = useAppSelector((state) => state.error);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    if (currentTheme === 'light') {
      deleteCookie('theme');
      setCookie('theme', 'dark', { path: '/', maxAge: 60 * 60 * 24 * 365 });
      setCurrentTheme('dark');
      router.refresh();
    }
    if (currentTheme === 'dark') {
      deleteCookie('theme');
      setCookie('theme', 'light', { path: '/', maxAge: 60 * 60 * 24 * 365 });
      setCurrentTheme('light');
      router.refresh();
    }
  };

  const handleCloseModal = () => {
    dispatch(onCloseModal());
  };
  return (
    <>
      {pathname === '/reviews' || pathname === '/contact' ? null : <FixedSocialMedia />}
      {children}
      <DayNightToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
      {error ? <ImageLoadingError /> : null}
    </>
  );
};

export default Layout;
