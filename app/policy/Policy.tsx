'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));
const Button = dynamic(() => import('@/components/buttons/button'));
const PolicyText = dynamic(() => import('@/components/policy/PolicyText'));

const Policy = () => {
  const router = useRouter();

  return (
    <>
      <Loader title='Политика в отношении обработки персональных данных' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <PolicyText />
          <Button type='button' variant={'defaultGhost'} size={'lg'} onClick={() => router.back()}>
            Назад
          </Button>
        </section>
      </main>
    </>
  );
};

export default Policy;
