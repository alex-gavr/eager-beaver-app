'use client';
import { ReactNode, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@uploadthing/react/styles.css';
import Button from '@/components/buttons/button';

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

  const handleLogin = () => {
    if (password === '265d46cc1c7501afff17aa87030cba8639cb9dbf2fa7d99c4301801da881d42a') {
      setAuth(true);
    }
  };

  return (
    <>
      {auth === true ? (
        <>{children}</>
      ) : auth === false ? (
        <NotAllowed />
      ) : (
        <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
          <h1 className='text-center text-2xl text-red-500 lg:text-4xl'>Do you know a password</h1>
          <div className='flex flex-col items-center justify-center'>
            <input
              className='mb-4'
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>login</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;