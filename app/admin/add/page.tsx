import { getPossibilities } from '@/utils/getPossibilities';
import Possibilities from '../Possibilities';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  const possibilities = getPossibilities('add');

  return (
    <div className='flex min-h-[90vh] flex-col items-center justify-center gap-4'>
      <h1 className='mb-8 text-center text-2xl md:text-3xl lg:text-5xl'>Что именно?</h1>
      <div className='grid grid-cols-1 gap-4  md:grid-cols-2'>
        {possibilities.map((item) => (
          <Possibilities key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
