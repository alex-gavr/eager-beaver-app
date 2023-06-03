import StyledLink from '@/components/StyledLink/StyledLink';
import { getPossibilities } from '@/utils/getPossibilities';
import Possibilities from '../Possibilities';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  const possibilities = getPossibilities('delete');
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl lg:text-5xl'>Что именно хочешь удалить?</h1>
      <div className='grid grid-cols-1 gap-4  md:grid-cols-2'>
        {possibilities.map((item) => (
          <Possibilities key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
