import Button from '@/components/buttons/button';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { m } from 'framer-motion';
// import ym from 'react-yandex-metrika';

const TeachingSteps = () => {
  const { width } = useWindowSize();
  const [step, setStep] = useState<number>(1);
  const [buttonText, setButtonText] = useState('так, и что дальше?');

  const handleClick = () => {
    if (step === 1) {
      setStep(2);
      setButtonText('а затем?');
      // ym('reachGoal','teachingStep2');
    } else if (step === 2) {
      setStep(3);
      setButtonText('отлично, продолжайте');
      // ym('reachGoal','teachingStep3');
    } else if (step === 3) {
      setStep(4);
      setButtonText('Ага, а дальше?');
      // ym('reachGoal','teachingStep4');
    } else if (step === 4) {
      setStep(5);
      setButtonText('а что потом?');
      // ym('reachGoal','teachingStep5');
    } else if (step === 5) {
      setButtonText('Ждем Вас ❤️');
      // ym('reachGoal','teachingChangeColor');
    }
  };

  interface ISteps {
    step: number;
    title: string;
    description: string;
  }

  const data: ISteps[] = [
    {
      step: 1,
      title: 'Запись на пробное занятие',
      description:
        'необходимо записаться на пробное занятие онлайн или оффлайн на сайте, в любом удобном мессенджере или по телефону',
    },
    {
      step: 2,
      title: 'Знакомство с ребенком',
      description:
        'далее мы проводим первый пробный урок, на котором знакомимся с ребенком, узнаем друг друга поближе, определяем уровень владения языком, выявляем пробелы и обозначаем цели обучения',
    },
    {
      step: 3,
      title: 'Формат занятий',
      description: 'выбираем удобный формат занятий - в группе или индивидуально, онлайн или оффлайн',
    },
    {
      step: 4,
      title: 'программа обучения',
      description:
        'прописываем программу обучения на ближайшее полугодие в соответствии с поставленными целями и уровнем владения языком',
    },
    {
      step: 5,
      title: 'путешествие начинается',
      description:
        'начинаем наше путешествие в невероятный мир изучения языка. Попутно знакомимся с его культурой с помощью наших мастер-классов, осваиваем грамматику, которая не давалась раньше, и много разговариваем, тренируя навыки произношения, в конце концов преодолевая разговорный барьер.',
    },
  ];

  const heightMobile = 190;
  const heightTablet = 170;
  const heightDesktop = 200;
  const transform = 65;

  const handleChangeStep = (step: number) => {
    setStep(step);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <div
        className='relative flex w-full flex-col items-center justify-center'
        style={
          width < 400
            ? {
                height:
                  step === 1
                    ? `${heightMobile}px`
                    : step === 2
                    ? `${heightMobile + transform * 1.2}px`
                    : step === 3
                    ? `${heightMobile + transform * 1.4}px`
                    : step === 4
                    ? `${heightMobile + transform * 2.7}px`
                    : `${heightMobile + transform * 5.1}px`,
              }
            : width < 800
            ? {
                height:
                  step === 1
                    ? `${heightTablet}px`
                    : step === 2
                    ? `${heightTablet + transform * 1.2}px`
                    : step === 3
                    ? `${heightTablet + transform * 1.7}px`
                    : step === 4
                    ? `${heightTablet + transform * 3}px`
                    : `${heightTablet + transform * 5}px`,
              }
            : {
                height:
                  step === 1
                    ? `${heightDesktop}px`
                    : step === 2
                    ? `${heightDesktop + transform * 1.2}px`
                    : step === 3
                    ? `${heightDesktop + transform * 1.7}px`
                    : step === 4
                    ? `${heightDesktop + transform * 3}px`
                    : `${heightDesktop + transform * 5}px`,
              }
        }
      >
        {data.map((data, index) => {
          return (
            <m.div
              className='absolute top-0 flex h-fit w-full min-w-[300px] max-w-[450px] flex-col items-start justify-start gap-2 rounded-3xl border border-primary-800 bg-accent-200 p-4 shadow-md dark:border dark:border-primary-200 dark:bg-slate-950'
              key={index}
              onClick={() => handleChangeStep(data.step)}
              animate={
                step > index
                  ? {
                      scale: (index + 50) * 0.018,
                      opacity: 1,
                      zIndex: index + 1,
                      y: index * transform,
                      z: index * 2 * transform,
                    }
                  : {
                      opacity: 0,
                      zIndex: 0 - index,
                      scale: 0.5,
                    }
              }
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <div className='flex w-full flex-row flex-nowrap items-center justify-between'>
                <h2 className='rounded-xl bg-primary-500 px-6 py-1 text-2xl dark:bg-slate-900 md:text-3xl'>
                  Шаг {index + 1}
                </h2>
                <p>{step === 5 ? data.title : step === index + 1 ? null : data.title}</p>
              </div>
              <p>{data.description}</p>
            </m.div>
          );
        })}
      </div>
      <Button type='button' variant='secondaryGhost' disabled={false} onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default TeachingSteps;
