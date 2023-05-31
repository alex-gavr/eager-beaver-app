'use client';
import Button from '@/components/buttons/button';
import { useCallback, useRef } from 'react';
import { ToastContainer, ToastContainerProps, ToastContentProps, toast } from 'react-toastify';

// TODO: Make a prompt to delete a card
const DeleteCard = ({
  heading,
  uuid,
  deleteItem,
}: {
  heading: string;
  uuid: string;
  deleteItem: (uuid: string) => Promise<void>;
}) => {
  // const toastId = useRef<HTMLDivElement>(null);

  const handlePrompt = () => {
    toast(<Confirmation deleteItem={deleteItem} uuid={uuid} />, {
      toastId: 'handlePrompt',
      autoClose: false,
      closeButton: false,
    });
  };
  // const handlePrompt = () => {};

  return (
    <>
      <div className='flex w-full min-w-[280px] max-w-[400px] flex-row items-center justify-between gap-4 rounded-xl bg-slate-200 p-4'>
        <h1 className='text-3xl'>{heading}</h1>
        <Button variant={'danger'} onClick={handlePrompt}>
          Delete
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
      <p className='lg:text-2xl'>Точно удаляем? 😁</p>
      <div className='flex w-full flex-row items-center justify-evenly gap-2'>
        <Button size={'sm'} variant={'danger'} onClick={handleDelete} className='lg:text-base 2xl:text-base px-6'>
          Да
        </Button>
        <Button size={'sm'} variant={'defaultGhost'} onClick={closeToast} className='lg:text-base 2xl:text-base px-6'>
          Нет, не надо
        </Button>
      </div>
    </div>
  );
};
