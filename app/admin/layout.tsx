'use client';
import { ReactNode, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@uploadthing/react/styles.css';
import Button from '@/components/buttons/button';
import production from '@/utils/isProd';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '@/components/breadCrumbs/Breadcrumbs';
import { usePathname } from 'next/navigation';
import { createPathArray } from '@/utils/createPathArray';

interface ILayoutProps {
  children: ReactNode;
}

const NotAllowed = () => {
  return (
    <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
      <h1 className='text-center text-2xl text-red-500 lg:text-4xl'>you are not allowed</h1>
    </div>
  );
};

const Layout = ({ children }: ILayoutProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string | null>();
  const pathName = usePathname();

  const pathNameArray = createPathArray(pathName);

  const handleLogin = () => {
    if (password === '265d46cc1c7501afff17aa87030cba8639cb9dbf2fa7d99c4301801da881d42a') {
      setAuth(true);
    }
  };

  return (
    <>
      {!production ? (
        <>
          {pathNameArray.length > 1 && <Breadcrumbs items={pathNameArray} />}
          {children}
          <ToastContainer />
        </>
      ) : auth === true ? (
        <>
          {pathNameArray.length > 1 && <Breadcrumbs items={pathNameArray} />}
          {children}
          <ToastContainer />
        </>
      ) : auth === false ? (
        <NotAllowed />
      ) : (
        <div className='flex min-h-[90vh] w-full flex-col items-center justify-center gap-8'>
          <h1 className='text-center text-2xl text-slate-900 dark:text-slate-200 lg:text-4xl'>Type the password</h1>
          <div className='flex flex-col items-center justify-center'>
            <input
              className='mb-8 min-w-[300px] rounded-md bg-slate-100 dark:bg-slate-800'
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} variant={'secondaryGhost'} size={'lg'}>login</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
