import StyledLink from '@/components/StyledLink/StyledLink';
import { getPossibilities } from '@/utils/getPossibilities';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  const possibilities = getPossibilities('delete');
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl lg:text-5xl'>Что именно хочешь удалить?</h1>
      <div className='grid grid-cols-1 gap-4  md:grid-cols-2'>
        {possibilities.map((item) => (
          <StyledLink
            key={item.id}
            href={item.path}
            variant={'secondaryGhost'}
            className='min-w-[300px] lg:min-w-[400px]'
          >
            <div className='flex w-full flex-row items-center justify-between gap-4'>
              <p className='text-black lg:text-2xl'>{item.name}</p>
              {item.icon}
            </div>
          </StyledLink>
        ))}
      </div>
    </div>
  );
};

export default Page;
