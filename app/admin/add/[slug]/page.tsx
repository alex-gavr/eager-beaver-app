import { IServerProps } from '@/app/page';
import dynamic from 'next/dynamic';;
import SimpleLoading from '@/components/SimpleLoading';

const Faq = dynamic(() => import('@/components/admin/Faq'), { ssr: false, loading: () => <SimpleLoading /> });
const FutureEvent = dynamic(() => import('@/components/admin/FutureEvent'), { ssr: false, loading: () => <SimpleLoading /> });
const Pricing = dynamic(() => import('@/components/admin/Pricing'), { ssr: false,loading: () => <SimpleLoading /> });
const Review = dynamic(() => import('@/components/admin/Review'), { ssr: false,loading: () => <SimpleLoading /> });
const Teacher = dynamic(() => import('@/components/admin/Teacher'), { ssr: false,loading: () => <SimpleLoading /> });
const ThematicEvent = dynamic(() => import('@/components/admin/ThematicEvent'), { ssr: false,loading: () => <SimpleLoading /> });

interface IPageProps {}

const Page = ({ params }: IServerProps) => {
  const { slug } = params;

  return (
    <section className='relative flex min-h-[90vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-2 py-4 lg:py-10'>
      {slug === 'teachers' && <Teacher />}
      {slug === 'reviews' && <Review />}
      {slug === 'futureEvents' && <FutureEvent />}
      {slug === 'prices' && <Pricing />}
      {slug === 'faq' && <Faq />}
      {slug === 'thematicEvents' && <ThematicEvent />}
    </section>
  );
};

export default Page;
