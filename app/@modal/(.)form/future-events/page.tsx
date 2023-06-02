import BackButton from '@/app/form/BackButton';
import Form from '@/app/form/Form';
import Heading from '@/app/form/Heading';
import Modal from '@/components/modal/modal';
import { db } from '@/db/db';
import { futureEvents } from '@/db/schemas';
import { eq } from 'drizzle-orm';

interface IFormModalProps {
  params: {
    id: string;
  };
  searchParams: {
    uuid: string;
  };
}

const FormFutureEventsModal = async ({ params, searchParams }: IFormModalProps) => {
  const heading = await db
    .select({ heading: futureEvents.eventName })
    .from(futureEvents)
    .where(eq(futureEvents.uuid, searchParams.uuid));

  return (
    <Modal>
      <div className='modalGradient relative flex max-w-xl flex-col items-center justify-center rounded-md px-2 py-4 lg:px-10 lg:py-10'>
        <Heading event={true} heading={heading[0].heading} />
        <Form event={true} searchParams={searchParams} />
        <BackButton />
      </div>
    </Modal>
  );
};

export default FormFutureEventsModal;
