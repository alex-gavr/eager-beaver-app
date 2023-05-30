import StyledLink from '@/components/StyledLink/StyledLink';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  return (
    <div className='min-h-[90vh] flex flex-col justify-center items-center gap-4'>
      <h1 className='text-2xl md:text-3xl lg:text-5xl mb-8 text-center'>Привет! Что хочешь сделать?</h1>
      <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
        <StyledLink href={'/admin/add'}>Добавить что-то новое</StyledLink>
        <StyledLink href={'/admin/edit'}>Редактировать что-то</StyledLink>
        <StyledLink href={'/admin/delete'}>Удалить что-то</StyledLink>
      </div>
    </div>
  );
};

export default Page;
