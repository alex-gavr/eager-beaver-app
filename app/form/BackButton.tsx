'use client';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {}

const BackButton = ({}: IBackButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div
      className='absolute bottom-0 right-0 z-50 flex flex-col items-center justify-center p-2 lg:p-4'
      onClick={handleClick}
    >
      <XCircleIcon className='h-8 w-8 text-slate-800 dark:text-slate-200 lg:h-10 lg:w-10' />
    </div>
  );
};

export default BackButton;
