import Link from 'next/link';

interface IPolicyProps {}

const Policy = ({}: IPolicyProps) => {
  const year = new Date().getFullYear();
  return (
    <div className='flex w-1/2 flex-col items-center justify-center gap-2 p-2 sm:w-full'>
      <Link className='text-xs tracking-widest text-slate-400 dark:text-slate-400' href='/policy'>
        Политика Обработки Персональных Данных
      </Link>
      <p className='text-xs tracking-widest text-slate-400 dark:text-slate-400'>
        Eager Beaver Language School © {year}
      </p>
    </div>
  );
};

export default Policy;
