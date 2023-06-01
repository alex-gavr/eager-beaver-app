'use client';
import Image from 'next/image';
import { TPrices } from '@/db/schemas';
import { cn } from '@/utils/cn';

interface IProps {
  prices: TPrices[];
}

const PriceCard = ({ prices }: IProps) => {
  return (
    <>
      {prices &&
        prices.map((price) => {
          const color = price.cardColor;
          return (
            <div className='flex w-60 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-600 bg-slate-50 px-1 py-4 shadow-md dark:border-slate-500 dark:bg-slate-950 sm:w-72 lg:w-80 lg:p-4'>
              <div
                className={cn(
                  'flex w-11/12 flex-col items-center justify-center rounded-lg p-4 lg:w-full',
                  color === 'yellow' ? 'bg-primary-800' : 'bg-accent-800',
                )}
              >
                <div className='flex flex-col items-center justify-center gap-2 rounded-lg'>
                  <h2 className='text-center text-2xl text-gray-100 dark:text-slate-900 sm:text-3xl'>
                    {price.priceName}
                  </h2>
                  <p
                    className={cn(
                      'text-center text-lg sm:text-xl md:text-2xl xl:text-3xl',
                      color === 'yellow'
                        ? 'text-accent-800 dark:text-accent-800'
                        : 'text-primary-800 dark:text-primary-800',
                    )}
                  >
                    {price.price}
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-4 p-2'>
                {/* First feature */}
                <ul className='flex w-full flex-row items-start justify-start gap-4'>
                  <Image
                    src={'/checkMark.svg'}
                    className='h-5 w-5'
                    width={50}
                    height={50}
                    alt='check mark'
                    priority
                  />
                  <li>{price.feature1}</li>
                </ul>
                {/* Second feature */}
                <ul className='flex w-full flex-row items-start justify-start gap-4'>
                  <Image
                    src={'/checkMark.svg'}
                    className='h-5 w-5'
                    width={50}
                    height={50}
                    alt='check mark'
                    priority
                  />
                  <li>{price.feature2}</li>
                </ul>
                {/* Third feature */}
                <ul className='flex w-full flex-row items-start justify-start gap-4'>
                  <Image
                    src={'/checkMark.svg'}
                    className='h-5 w-5'
                    width={50}
                    height={50}
                    alt='check mark'
                    priority
                  />
                  <li>{price.feature3}</li>
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PriceCard;
