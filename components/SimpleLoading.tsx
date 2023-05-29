import { ArrowPathIcon } from '@heroicons/react/24/outline';

const SimpleLoading = ({}) => {
  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center'>
      <div className='-translate-y-5'>
        <ArrowPathIcon className='h-10 w-10 lg:w-16 lg:h-16 text-accent-800 dark:text-accent-200 animate-spin' />
      </div>
    </div>
  );
};

export default SimpleLoading;
