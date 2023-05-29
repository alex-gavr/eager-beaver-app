
import Form from './Form';
import Heading from './Heading';

interface IFormProps {}

const FormPage = ({}: IFormProps) => {

  return (
    <main className='flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden'>
      <section className='relative flex max-w-[1500px] flex-col items-center justify-center gap-8 rounded-xl bg-slate-200 dark:bg-slate-900 px-2 py-8 xl:p-16'>
        <Heading event={false} />
        <Form searchParams={{uuid: undefined}} event={false}  />
      </section>
    </main>
  );
};

export default FormPage;
