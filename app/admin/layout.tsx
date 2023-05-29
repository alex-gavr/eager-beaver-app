import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@uploadthing/react/styles.css';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <ToastContainer />
      <>{children}</>
    </>
  );
};

export default Layout;
