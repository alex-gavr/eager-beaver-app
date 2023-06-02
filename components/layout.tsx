'use client';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import { useAppContext } from '@/context/Context';

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
  const { state } = useAppContext();
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
  const allowedPathsForSocialMedia = ['/', '/teachers', '/pricing', '/schedule', '/faq'];
  const isAllowedPath = allowedPathsForSocialMedia.includes(pathname);

  return (
    <>
      {isAllowedPath ? <FixedSocialMedia /> : null}
      {children}
      <DayNightToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
      {state.error ? <ImageLoadingError /> : null}
    </>
  );
};

export default Layout;
