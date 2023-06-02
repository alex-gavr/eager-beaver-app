import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@uploadthing/react/styles.css';
import Auth from './Auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
  },
};
interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Auth children={children} />
    </>
  );
};

export default Layout;
