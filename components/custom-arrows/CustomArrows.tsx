import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import { cn } from '@/utils/cn';

const baseStyles =
  'flex flex-col items-center justify-center absolute rounded-full p-2 select-none bg-slate-950 bg-opacity-50 dark:bg-slate-800 dark:bg-opacity-50 z-50';

export const LeftArrow = ({ onClick, alwaysBottom, ...rest }: any) => {
  const { width } = useWindowSize();
  const left = 'left-0';
  const sizeStyles = width < 800 ? 'w-[45px] h-[45px] bottom-[5px]' : 'w-[60px] h-[60px] bottom-[50%]';
  const alwaysBottomStyle = alwaysBottom === true ? 'bottom-[5px]' : 'bottom-[50%]';
  const marginLeft = width < 500 ? 'ml-[1rem]' : 'ml-[3rem]';
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <div
      className={cn(baseStyles, left, sizeStyles, alwaysBottomStyle, marginLeft)}
      onClick={() => onClick()}
    >
      <Image src={'/downArrow.svg'} width={30} height={20} alt='' style={{ rotate: '90deg' }} />
    </div>
  );
};

export const RightArrow = ({ onClick, alwaysBottom, ...rest }: any) => {
  const { width } = useWindowSize();

  const right = 'right-0';
  const sizeStyles = width < 800 ? 'w-[45px] h-[45px] bottom-[5px]' : 'w-[60px] h-[60px] bottom-[50%]';
  const alwaysBottomStyle = alwaysBottom === true ? 'bottom-[5px]' : 'bottom-[50%]';
  const marginReft = width < 500 ? 'mr-[1rem]' : 'mr-[3rem]';
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <div
      className={cn(baseStyles, right, sizeStyles, alwaysBottomStyle, marginReft)}
      onClick={() => onClick()}
    >
      <Image src={'/downArrow.svg'} width={30} height={20} alt='' style={{ rotate: '-90deg' }} />
    </div>
  );
};
