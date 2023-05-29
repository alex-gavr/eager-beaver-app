import BackButton from '@/app/form/BackButton';
import Form from '@/app/form/Form';
import Heading from '@/app/form/Heading';
import Modal from '@/components/modal/modal';

interface IFormModalProps {
  params: {
    id: string;
  };
  searchParams: {
    uuid: string;
  };
}

const FormFutureEventsModal = ({ params, searchParams }: IFormModalProps) => {
  console.log(searchParams);
  return (
    <Modal>
      <div className='modalGradient relative flex max-w-xl flex-col items-center justify-center rounded-md px-2 py-4 lg:px-10 lg:py-10'>
        <Heading event={true} />
        <Form event={true} searchParams={searchParams} />
        <BackButton />
      </div>
    </Modal>
  );
};

export default FormFutureEventsModal;
