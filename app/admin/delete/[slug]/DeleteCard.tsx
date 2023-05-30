'use client';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';

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
  const handleDelete = async () => {
    await toast.promise(deleteItem(uuid), {
      pending: 'Удаляем...',
      success: 'Успешно удалено!',
      error: 'Ошибка 🤯',
    });
  };

  return (
    <>
      <div className='flex w-full min-w-[280px] max-w-[400px] flex-row items-center justify-between gap-4 rounded-xl bg-slate-200 p-4'>
        <h1 className='text-3xl'>{heading}</h1>
        <Button variant={'danger'} onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteCard;

// const Msg = ({ closeToast, table, uuid }: any) => {

//   return (
//     <div className='flex flex-col items-center justify-center gap-4'>
//       <p>Do really want to delete this?</p>
//       <div className='flex w-full flex-row items-center justify-evenly gap-2'>
//         <Button size={'sm'} variant={'danger'} onClick={}>
//           Confirm
//         </Button>
//         <Button size={'sm'} variant={'defaultGhost'} onClick={closeToast}>
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// };
