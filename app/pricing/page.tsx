import { Metadata } from 'next';
import { db } from '@/db/db';
import { TPrices, prices } from '@/db/schemas';
import dynamic from 'next/dynamic';
import SwiperCards from '@/components/prices/SwiperCards';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'Тарифы',
  description: 'Возможные варианты занятий с нами',
};

const SidePopUp = dynamic(() => import('@/components/prices/side-popup/SidePopUp'), {
  ssr: false,
});
const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});

interface IProps {}
const Pricing = async ({}: IProps) => {
  const pricesData = (await db.select().from(prices)) as TPrices[];

  return (
    <>
      <Loader title='Тарифы' layoutId='prices' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-4xl text-primary-800 dark:text-primary-800 md:text-5xl'>Тарифы</h1>
            <h2 className='z-10 mb-8 text-center text-xl text-accent-800 dark:text-accent-800 md:text-2xl'>
              выбирай подходящий и приходи учиться
            </h2>
          </div>
          <div className='relative mb-12 flex min-h-[50vh] w-full flex-col items-center justify-center'>
            <SwiperCards prices={pricesData} />
          </div>
          <ActionButtons variantPrimary='secondary' variantBack={'primaryGhost'} showBackButton={true} />
          <span className='absolute bottom-0 h-3/5 w-screen rounded-tl-[40%] rounded-tr-[40%] bg-primary-200 dark:bg-zinc-900' />
        </section>
        <SidePopUp />
      </main>
    </>
  );
};

export default Pricing;
