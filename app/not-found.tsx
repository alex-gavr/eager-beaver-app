'use client';
import Image from 'next/image';
import Button from '@/components/buttons/button';
import { useRouter } from 'next/navigation';
import beaver from '@/images/beaver/scared.svg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const Custom404 = () => {
  const router = useRouter();
  return (
    <main className='flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden'>
      <div className='relative mb-8 flex w-full flex-col items-center justify-center gap-8'>
        <h1 className='text-center'>Куда это вы забрели?</h1>
        <Image className='w-[60%] sm:w-[50%] md:w-[30%]' src={beaver} alt='' />
        <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-8 lg:flex-row lg:flex-nowrap'>
          <Button type='button' variant={'primary'} onClick={() => router.push('/')}>
            На Главную{' '}
          </Button>
          <Button type='button' variant={'secondary'} onClick={() => router.back()}>
            Назад{' '}
          </Button>
        </div>
      </div>
    </main>
  );
};
export default Custom404;
