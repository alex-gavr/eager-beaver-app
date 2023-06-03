import Policy from '@/app/policy/Policy';
import Modal from '@/components/modal/modal';

interface IPolicyModalProps {}

const PolicyModal = ({}: IPolicyModalProps) => {
  return (
    <Modal>
      <div className='relative modalGradient flex flex-col items-start justify-center p-4 rounded-lg'>
        <Policy />
      </div>
    </Modal>
  );
};

export default PolicyModal;
