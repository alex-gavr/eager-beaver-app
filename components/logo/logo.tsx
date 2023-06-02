import logo from '@/images/logo.svg';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='flex flex-row items-center gap-4'>
        <Image priority src={logo} alt='logo' className='h-20 w-20' />
        <p className='koskoBold text-2xl lowercase tracking-wider text-primary-800 dark:text-primary-800 text-shadow'>
          Eager
          <br />
          Beaver
        </p>
      </div>
    </Link>
  );
};
