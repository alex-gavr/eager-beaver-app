import FormSuccess from '@/app/form-success/FormSuccess';
import BackButton from '@/app/form/BackButton';
import Modal from '@/components/modal/modal';

interface ISuccessModalProps {}

const SuccessModal = ({}: ISuccessModalProps) => {
  return (
    <Modal>
      <div className='relative modalGradient flex flex-col items-start justify-center p-4 rounded-lg'>
        <FormSuccess />
        <BackButton />
      </div>
    </Modal>
  );
};

export default SuccessModal;
