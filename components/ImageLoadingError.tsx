import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/button';
import { m } from 'framer-motion';
import { useAppContext } from '@/context/Context';
import { ActionsType } from '@/context/actionsTypes';

const ImageLoadingError = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const handleClick = () => {
    dispatch({ type: ActionsType.setError, payload: false });
    router.refresh();
  };

  return (
    <m.div
      className='fixed bottom-2 right-2 z-[989] flex flex-row flex-nowrap items-center justify-center gap-2 rounded-sm bg-red-700 p-4 dark:bg-red-700 sm:gap-4'
      initial={{ opacity: 0, y: '100vw' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <p className='text-slate-200 dark:text-slate-200'>Произошла ошибка загрузки</p>
      <Button type='button' variant={'primary'} onClick={handleClick}>
        Повторить
      </Button>
    </m.div>
  );
};

export default ImageLoadingError;
