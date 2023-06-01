'use client';
import Button from '@/components/buttons/button';
import { ToastContentProps, toast } from 'react-toastify';

const DeleteCard = ({
  heading,
  uuid,
  deleteItem,
}: {
  heading: string;
  uuid: string;
  deleteItem: (uuid: string) => Promise<void>;
}) => {
  const handlePrompt = () => {
    toast(<Confirmation deleteItem={deleteItem} uuid={uuid} />, {
      toastId: 'handlePrompt',
      autoClose: false,
      closeButton: false,
      theme: 'dark'
    });
  };

  return (
    <>
      <div className='flex w-full min-w-[280px] max-w-xl flex-row items-center justify-between gap-4 rounded-xl border border-slate-400 bg-gradient-to-bl from-fuchsia-200 to-violet-100 p-4 shadow-md'>
        <p className='lg:text-2xl'>{heading}</p>
        <Button variant={'danger'} onClick={handlePrompt}>
          delete
        </Button>
      </div>
    </>
  );
};

export default DeleteCard;

interface IConfirmationProps extends Partial<ToastContentProps> {
  deleteItem: (uuid: string) => Promise<void>;
  uuid: string;
}
const Confirmation = ({ closeToast, deleteItem, uuid }: IConfirmationProps) => {
  const handleDelete = async () => {
    await toast.promise(deleteItem(uuid), {
      pending: 'Удаляем...',
      success: 'Успешно удалено!',
      error: 'Ошибка 🤯',
    });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 '>
      <p className='lg:text-2xl text-white'>Точно удаляем? 😁</p>
      <div className='flex w-full flex-row items-center justify-evenly gap-2'>
        <Button
          size={'sm'}
          variant={'danger'}
          onClick={handleDelete}
          className='px-6 lg:text-base 2xl:text-base'
        >
          Да
        </Button>
        <Button
          size={'sm'}
          variant={'secondaryGhost'}
          onClick={closeToast}
          className='px-6 lg:text-base 2xl:text-base text-white'
        >
          Нет, не надо
        </Button>
      </div>
    </div>
  );
};
