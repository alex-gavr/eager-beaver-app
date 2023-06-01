import StyledLink from '@/components/StyledLink/StyledLink';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  return (
    <div className='flex min-h-[90vh] flex-col items-center justify-center gap-4'>
      <h1 className='mb-8 text-center text-2xl md:text-3xl lg:text-5xl'>Привет! Что хочешь сделать?</h1>
      <div className='flex flex-col items-center justify-center gap-8'>
        <StyledLink href={'/admin/add'} variant={'primaryGhost'} className='min-w-[300px]'>
          <div className='flex w-full flex-row items-center justify-between gap-4'>
            <p>Добавить новое</p>
            <PlusIcon className='h-10 w-10 text-emerald-500' />
          </div>
        </StyledLink>
        <StyledLink href={'/admin/edit'} variant={'primaryGhost'} className='min-w-[300px]'>
          <div className='flex w-full flex-row items-center justify-between gap-4'>
            <p>Редактировать</p>
            <PencilSquareIcon className='h-10 w-10 text-yellow-500' />
          </div>
        </StyledLink>
        <StyledLink href={'/admin/delete'} variant={'primaryGhost'} className='min-w-[300px]'>
          <div className='flex w-full flex-row items-center justify-between gap-4'>
            <p>Удалить</p>
            <TrashIcon className='h-10 w-10 text-red-500' />
          </div>
        </StyledLink>
      </div>
    </div>
  );
};

export default Page;
