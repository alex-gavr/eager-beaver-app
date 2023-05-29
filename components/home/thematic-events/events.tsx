'use client'
import { TwoColumns } from './two-columns';
import { AnimatePresence, m } from 'framer-motion';
import { list, toUp } from '@/utils/motion-animations';
import AnimatedTextWords from '@/components/AnimatedTextWords/AnimatedTextWords';
import { useInView } from 'react-intersection-observer';
import { IEventsData } from '@/db/schemas';

interface IProps {
  themeEvents: IEventsData[];
}

const Events = ({ themeEvents }: IProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <AnimatePresence>
      <div
        className='relative flex min-h-[80vh] max-w-[1500px] flex-col items-center justify-center gap-12 px-2 py-4 md:p-8'
        ref={ref}
      >
        {inView ? (
          <>
            <m.div className='flex flex-col items-center justify-center w-full gap-4' variants={list} whileInView='visible' initial='hidden'>
              <h1>
                <AnimatedTextWords
                  title={true}
                  text='Тематические мероприятия'
                  textAnimation='fromTopRight'
                />
              </h1>
              <m.p
              className='text-center py-4'
                variants={toUp}
                whileInView='visible'
                initial='hidden'
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              >
                Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом,
                чтобы ребенок был увлечен образовательным процессом. Поэтому помимо основного обучения мы
                регулярно проводим тематические праздники и мастер-классы, что является для нас неотъемлемой
                частью образования.
              </m.p>
            </m.div>
            {themeEvents.map((event) => (
              <TwoColumns
                key={event.uuid}
                images={event.images}
                alt={event.heading}
                imageSide={event.imageSide}
                heading={event.heading}
                paragraph={event.paragraph}
              />
            ))}
          </>
        ) : null}
      </div>
    </AnimatePresence>
  );
};
export default Events;
