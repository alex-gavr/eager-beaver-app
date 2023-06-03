'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Button = dynamic(() => import('@/components/buttons/button'));
const PolicyText = dynamic(() => import('@/components/policy/PolicyText'));

const Policy = () => {
  const router = useRouter();

  return (
    <>
      <PolicyText />
      <Button
        type='button'
        variant={'defaultGhost'}
        size={'lg'}
        onClick={() => router.back()}
        className='place-self-center'
      >
        Назад
      </Button>
    </>
  );
};

export default Policy;
