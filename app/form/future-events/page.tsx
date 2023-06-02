import { db } from '@/db/db';
import Form from '../Form';
import Heading from '../Heading';
import { futureEvents } from '@/db/schemas';
import { eq } from 'drizzle-orm';

interface IFormProps {
  searchParams: {
    uuid: string;
  };
}

const FormFutureEventsPage = async ({ searchParams }: IFormProps) => {
  const heading = await db
    .select({ heading: futureEvents.eventName })
    .from(futureEvents)
    .where(eq(futureEvents.uuid, searchParams.uuid));

  return (
    <main className='flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden'>
      <section className='relative flex max-w-[1500px] flex-col items-center justify-center gap-8 rounded-xl bg-slate-200 px-6 py-8 dark:bg-slate-900 xl:p-16'>
        <Heading event={true} heading={heading[0].heading} />
        <Form searchParams={{ uuid: searchParams.uuid }} event={true} />
      </section>
    </main>
  );
};

export default FormFutureEventsPage;
