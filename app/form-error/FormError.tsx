
import Button from '@/components/buttons/button';
import { cookies } from 'next/dist/client/components/headers';

const FormError = () => {
  const cookiesList = cookies();
  const name = cookiesList.get('name')?.value;
  return (
    <>
      <div className='f-full z-10 flex flex-col items-center justify-center gap-2'>
        <h1 className='mb-2 rounded-md bg-red-800 px-4 py-2 text-center text-2xl leading-relaxed text-slate-100 dark:bg-red-800 dark:text-slate-100 lg:text-4xl'>
          Произошла ошибка{name ? `, ${name}` : null} 😭
        </h1>
        <p className='text-center text-base text-slate-800 dark:text-primary-500 lg:text-xl'>
          Попробуйте, пожалуйста, снова!
        </p>
      </div>
      <Button variant={'default'} size={'lg'} back>
        Хорошо
      </Button>
    </>
  );
};

export default FormError;
