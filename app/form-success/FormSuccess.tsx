import StyledLink from '@/components/StyledLink/StyledLink';
import Button from '@/components/buttons/button';
import { cookies } from 'next/dist/client/components/headers';

const FormSuccess = () => {
  const cookiesList = cookies();
  const name = cookiesList.get('name')?.value;
  return (
    <>
      <div className='z-10 flex flex-col items-center justify-center gap-2'>
        <h1 className='mb-2 rounded-md bg-accent-800 px-4 py-2 text-center text-2xl leading-relaxed text-slate-100 dark:bg-accent-800 dark:text-slate-100 lg:text-4xl'>
          Благодарим за заявку{name ? `, ${name}` : null}!
        </h1>
        <p className='text-center text-base text-slate-800 dark:text-primary-500 lg:text-xl'>
          В ближайшее время с вами свяжутся
        </p>
        <Button variant={'default'} back className='mt-4'>
          отлично 👍
        </Button>

        {/* TODO: Needs to be like that but currently is broken on the NextJS side */}
        {/* <StyledLink variant={'default'} size={'lg'} href={'/'} className='mt-4'>
          отлично 👍
        </StyledLink> */}
      </div>
    </>
  );
};

export default FormSuccess;
