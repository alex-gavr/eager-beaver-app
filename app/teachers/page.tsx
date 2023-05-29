import { Metadata } from 'next';
import { db } from '@/db/db';
import { TTeachers, teachers } from '@/db/schemas';
import dynamic from 'next/dynamic';
import TeacherCard from '@/components/teacher-card/teacher-card';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'Преподаватели',
  description:
    'Наши прекрасные учителя знают как найти подход к каждому ученику и сделать обучение увлекательным путешествием. Поэтому результаты не заставят себя ждать!',
};

const ActionButtons = dynamic(
  () => import('../../components/buttons/action-buttons-page-end/ActionButtons'),
  {
    ssr: false,
  },
);

interface IProps {}

const Teachers = async ({}: IProps) => {
  const teachersData = (await db.select().from(teachers)) as TTeachers[];
  return (
    <>
      <Loader title='Наши преподаватели' layoutId='ourTeachers' />
      <main className='flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden'>
        <section className='relative flex max-w-[1500px] flex-col items-center justify-start gap-8 px-2 py-8 xl:p-16'>
          <h1 className='text-center text-3xl leading-relaxed md:text-4xl lg:text-5xl'>
            Наши{' '}
            <span className='rounded-2xl bg-accent-800 px-2 py-1 text-slate-900 dark:bg-accent-800 dark:text-slate-100'>
              преподаватели
            </span>
          </h1>
          <div className='grid grid-cols-1 place-items-center items-start gap-x-8 gap-y-12 lg:grid-cols-2'>
            {teachersData.length > 1 &&
              teachersData.map((teacher) => (
                <TeacherCard
                  key={teacher.uuid}
                  image={teacher.image}
                  alt={teacher.fullName}
                  name={teacher.fullName}
                  description={teacher.description}
                  includePlay={true}
                />
              ))}
          </div>
          <ActionButtons variantPrimary={'primary'} variantBack={'secondaryGhost'} showBackButton={true} />
        </section>
      </main>
    </>
  );
};

export default Teachers;
