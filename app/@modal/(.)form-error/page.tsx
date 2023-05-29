import FormError from '@/app/form-error/FormError';
import BackButton from '@/app/form/BackButton';
import Modal from '@/components/modal/modal';

interface ISuccessModalProps {}

const FormErrorModal = ({}: ISuccessModalProps) => {
  return (
    <Modal>
      <div className='relative modalGradient flex flex-col items-center justify-center gap-4 p-4 rounded-lg'>
        <FormError />
        <BackButton />
      </div>
    </Modal>
  );
};

export default FormErrorModal;
