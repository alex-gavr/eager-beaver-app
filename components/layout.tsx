'use client';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
import { Analytics } from '@vercel/analytics/react';
import Skeleton from 'react-loading-skeleton';
import Header from './menus/header/header';
import { KoskoBold, KoskoRegular } from '@/fonts/Fonts';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import production from '@/utils/isProd';

const Footer = dynamic(() => import('@/components/menus/footer/footer'), {
  ssr: false,
});
const FixedSocialMedia = dynamic(() => import('@/components/social-media-block/FixedSocialMedia'), {
  ssr: false,
});
const DayNightToggle = dynamic(() => import('@/components/toggle'), {
  ssr: false,
});
const Modal = dynamic(() => import('@/components/modal/modal'), {
  ssr: false,
});
const FormPopUp = dynamic(() => import('@/components/submit-form/form-popup/FormPopUp'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Skeleton style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </div>
  ),
});
const FormPopUpSubmitSuccess = dynamic(
  () => import('@/components/submit-form/form-popup/FormPopUpSubmitSuccess'),
  {
    ssr: false,
  },
);
const FormPopUpSubmitFail = dynamic(() => import('@/components/submit-form/form-popup/FormSubmitFailPopUp'), {
  ssr: false,
});
const ImageLoadingError = dynamic(() => import('@/components/ImageLoadingError'), {
  ssr: false,
});
const PolicyText = dynamic(() => import('@/components/policy/PolicyText'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Skeleton style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </div>
  ),
});
const YMetrika = dynamic(() => import('@/components/Metrika/YMetrika'));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
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
  const { showLoader } = useAppSelector((state) => state.homeLoader);
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
    <Wrapper className={`${KoskoBold.variable} ${KoskoRegular.variable}`}>
      {/* Vercel Analytics */}
      <Analytics />
      {/* Yandex Metrika Analytics */}
      {production && <YMetrika />}
      <Header />
      {pathname === '/reviews' || pathname === '/contact' ? null : <FixedSocialMedia />}
      {/* This div is makes animation show in footer, but not in header */}
      {children}
      {!showLoader ? <Footer /> : false}
      {/* Theme Toggler */}
      <DayNightToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
      {/* Modals */}
      <div id='modal'></div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} closeButton={formFromModal || formFutureEvents ? true : false}>
          {submitSuccess && <FormPopUpSubmitSuccess />}
          {submitSuccess === false && <FormPopUpSubmitFail />}
          {formFromModal && <FormPopUp futureEvents={false} />}
          {formFutureEvents && <FormPopUp futureEvents={true} />}
          {showPolicy && <PolicyText />}
        </Modal>
      )}
      {/* Image Error Loading */}
      {error ? <ImageLoadingError /> : null}
    </Wrapper>
  );
};

export default Layout;
