import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { toggleHeight } from '@/utils/motion-animations';
import { TFaq } from '@/db/schemas';

const FAQComponent = ({ question, description }: Omit<TFaq, 'uuid'>) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      className=' flex w-full flex-col items-center justify-center rounded-3xl border border-slate-300 bg-slate-50 p-8 shadow-2xl dark:border-slate-500 dark:bg-slate-950'
      onClick={handleToggle}
    >
      <div className='flex w-full flex-row flex-nowrap items-center justify-between'>
        <h3 className='w-[90%] text-center text-lg tracking-wider dark:text-slate-300 md:text-xl lg:w-full lg:text-left lg:text-2xl'>
          {question}
        </h3>
        <div className='ml-4 p-1 lg:p-4'>
          <Image
            src={'/downArrow.svg'}
            width={30}
            height={20}
            alt=''
            style={{
              transform: open ? 'rotate(540deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s ease-in-out',
            }}
          />
        </div>
      </div>
      <AnimatePresence mode='wait'>
        {open && (
          <m.p
            className='text-lg tracking-wider lg:text-2xl'
            variants={toggleHeight}
            initial={toggleHeight.hidden}
            animate={toggleHeight.visible}
            exit={toggleHeight.exit}
          >
            {description}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FAQComponent;
