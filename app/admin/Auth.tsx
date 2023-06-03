'use client';

import Breadcrumbs from '@/components/breadCrumbs/Breadcrumbs';
import Button from '@/components/buttons/button';
import production from '@/utils/isProd';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

interface IAuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: IAuthProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string | null>();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuth(true);
    }
  };
  return (
    <>
      {!production ? (
        <>
          <Breadcrumbs />
          {children}
          <ToastContainer />
        </>
      ) : auth === true ? (
        <>
          <Breadcrumbs />
          {children}
          <ToastContainer />
        </>
      ) : auth === false ? (
        <NotAllowed />
      ) : (
        <div className='flex min-h-[90vh] w-full flex-col items-center justify-center gap-8'>
          <h1 className='text-center text-2xl text-slate-900 dark:text-slate-200 lg:text-4xl'>
            Type the password
          </h1>
          <div className='flex flex-col items-center justify-center'>
            <input
              className='mb-8 min-w-[300px] rounded-md bg-slate-100 dark:bg-slate-800'
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} variant={'secondaryGhost'} size={'lg'}>
              login
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;

const NotAllowed = () => {
  return (
    <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
      <h1 className='text-center text-2xl text-red-500 lg:text-4xl'>you are not allowed</h1>
    </div>
  );
};
