'use client'; // Error components must be Client Components
import Button from '@/components/buttons/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import beaver from '@/images/beaver/scared.svg';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
      <div className='mb-8 flex min-h-[80vh] w-full flex-col items-center justify-center gap-8'>
        <h1 className='text-center text-3xl sm:text-4xl xl:text-5xl'>Произошла ошибка</h1>
        <Image className='w-[60%] sm:w-[50%] md:w-[30%]' src={beaver} alt='beaver' />
        <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-8 lg:flex-row lg:flex-nowrap'>
          <Button type='button' variant={'primary'} onClick={() => reset()}>
            Попробовать Снова
          </Button>
          <Button type='button' variant={'secondary'} onClick={() => router.back()}>
            Назад
          </Button>
        </div>
      </div>
    </main>
  );
}
