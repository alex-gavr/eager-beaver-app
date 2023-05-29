'use client';
import { useRouter } from 'next/navigation';
import Button, { IButtonProps, TButtonVariants } from '../button';
import { useAppDispatch } from '@/services/hook';
import { onOpenModalForm } from '@/services/modalSlice';
import { hasCookie } from 'cookies-next';

interface IProps extends IButtonProps {
  variantPrimary: TButtonVariants['variant'];
  variantBack?: TButtonVariants['variant'];
  showBackButton: boolean;
}

const ActionButtons = ({
  variantPrimary,
  variantBack,
  className,
  rounded,
  size,
  font,
  showBackButton,
}: IProps) => {
  const router = useRouter();
  const futureEventsCookie = hasCookie('futureEvents');
  const event = hasCookie('event');

  const handleClick = () => {

    router.push('/form');
  };

  return (
    <div className='z-10 flex w-full flex-col items-center justify-center gap-8 sm:flex-row sm:flex-nowrap'>
      <Button
        variant={variantPrimary}
        rounded={rounded}
        size={size}
        font={font}
        className={className}
        type='button'
        disabled={false}
        onClick={handleClick}
      >
        Пробное занятие бесплатно
      </Button>
      {showBackButton && (
        <Button
          variant={variantBack}
          rounded={rounded}
          size={size}
          font={font}
          className={className}
          type='button'
          disabled={false}
          onClick={() => router.back()}
        >
          Назад
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
