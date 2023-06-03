import { Metadata } from 'next';
import Policy from './Policy';
import Loader from '@/components/Loader';

interface IPageProps {}

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const Page = ({}: IPageProps) => {
  return (
    <>
      <Loader title='Политика в отношении обработки персональных данных' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <Policy />
        </section>
      </main>
    </>
  );
};

export default Page;
