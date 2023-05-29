'use client';
import dynamic from 'next/dynamic';
import FAQComponent from '@/components/faq/faq-component';
import Loader from '@/components/Loader';
import { TFaq } from '@/db/schemas';

const ActionButtons = dynamic(() => import('@/components/buttons/action-buttons-page-end/ActionButtons'), {
  ssr: false,
});

interface IProps {
  faq: TFaq[];
}
const FAQ = ({ faq }: IProps) => {
  return (
    <>
      <Loader title='Вопрос / Ответ' layoutId='faq' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex w-[95%] max-w-[1500px] flex-col items-center justify-start gap-16 px-2 py-8 lg:w-4/5 xl:p-16'>
          <h1 className='z-10 text-slate-900 dark:text-slate-200 text-4xl text-center lg:text-5xl leading-relaxed'>
            <span className='rounded-2xl bg-primary-800 px-4 py-2 text-slate-900 dark:bg-primary-800 dark:text-slate-900'>
              Вопрос
            </span>{' '}
            / Ответ
          </h1>
          <div className='z-10 flex w-full flex-col flex-nowrap items-center justify-center gap-12'>
            {faq.map((question) => (
              <FAQComponent
                key={question.uuid}
                question={question.question}
                description={question.description}
              />
            ))}
          </div>
          <ActionButtons
            variantPrimary='primary'
            variantBack='secondaryGhost'
            showBackButton={true}
          />
          <span className='absolute top-0 h-[300px] w-screen rounded-bl-[50%] rounded-br-[50%] bg-primary-200 dark:bg-slate-800' />
        </section>
      </main>
    </>
  );
};

export default FAQ;
