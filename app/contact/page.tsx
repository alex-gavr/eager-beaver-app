import { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cloud from '@/images/clouds/1.svg';
import cloud2 from '@/images/clouds/2.svg';
import cloud3 from '@/images/clouds/3.svg';
import { baseClassName } from '@/components/CloudsContainer';
import Loader from '@/components/Loader';
import { cn } from '@/utils/cn';
import SocialMediaIcons from '@/components/social-media-block/SocialMediaIcons';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Как связаться? Где находитесь? И как добраться? Ответы есть здесь!',
};

const SchoolLocationMap = dynamic(() => import('@/components/map/map'), {
  loading: () => <div className='h-[300px] w-[300px] lg:h-[550px] lg:w-[550px]' />,
});

const Contact = () => {
  return (
    <>
      <Loader title='Контакты' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <div className='grid grid-cols-1 items-center justify-items-center gap-8 lg:grid-cols-2'>
            <SchoolLocationMap
              style={{ order: 2 }}
              widthDesktop={550}
              heightDesktop={550}
              widthMobile={300}
              heightMobile={300}
            />
            <div className='relative order-1 col-span-1 flex w-[90%] flex-col items-start justify-center gap-4 lg:order-2'>
              <h1>Контакты</h1>
              <p> г. Волгоград, БЦ &quot;Меркурий&quot;, ул. Калинина, д. 13, 8-й этаж, офис 807 </p>
              <p>
                Телефон для связи: <a href='tel:+7(909)380-96-57'>+7(909)380-96-57</a>
              </p>
              <h2>Соцсети</h2>
              <div className='z-10 flex flex-row flex-nowrap items-center justify-center gap-5 overflow-hidden'>
                <SocialMediaIcons />
              </div>
            </div>
            <span className={cn(baseClassName, 'left-0 top-0 md:bottom-10 md:top-auto lg:top-0')}>
              <Image src={cloud} alt='' />
            </span>
            <span className={cn(baseClassName, 'right-[10%] top-0 h-40 w-40')}>
              <Image src={cloud2} alt='' />
            </span>
            <span className={cn(baseClassName, 'bottom-[10%] right-[5%] h-28 w-28')}>
              <Image src={cloud3} alt='' />
            </span>
          </div>
        </section>
      </main>
    </>
  );
};
export default Contact;
