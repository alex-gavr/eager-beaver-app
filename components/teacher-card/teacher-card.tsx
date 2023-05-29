import Image from 'next/image';
import { cn } from '@/utils/cn';
import { ImageWithSkeleton } from '../image-with-skeleton/img-with-skeleton';

interface IProps {
  image: string;
  alt: string;
  name: string;
  description: string;
  includePlay: boolean;
}

const TeacherCard = ({ image, alt, name, description, includePlay }: IProps) => {

  const sizeStyle = 'w-52 h-52 sm:h-56 sm:w-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96';

  return (
    <div className='relative flex w-full max-w-[600px] flex-col items-center justify-start gap-4 overflow-hidden'>
      <div className={cn('relative mt-4 rounded-full', sizeStyle, 'teachersShadow')}>
        <div
          className={cn('relative flex items-center justify-center overflow-hidden rounded-full', sizeStyle)}
        >
          <ImageWithSkeleton className='object-cover' src={image} alt={alt} />
        </div>
        {includePlay && (
          <Image
            src={'/play.svg'}
            className='absolute bottom-0 right-0 z-30 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20'
            width={50}
            height={50}
            alt=''
            priority
          />
        )}
      </div>
      <div className='flex w-full flex-col items-center justify-center overflow-hidden'>
        <h2 className='text-center text-slate-900 dark:text-slate-100'>{name}</h2>
      </div>
      <div className='flex w-full flex-col items-center justify-center overflow-hidden'>
        <p className='text-center'>{description}</p>
      </div>
    </div>
  );
};
export default TeacherCard;
