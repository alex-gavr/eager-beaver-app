import { AnimatePresence, m } from 'framer-motion';
import {
  textFromTop,
  textFromTopRight,
  textFromRight,
  textFromBottomRight,
  textFromBottom,
  textFromBottomLeft,
  textFromLeft,
  textFromTopLeft,
} from '@/utils/motion-animations';
import { cn } from '@/utils/cn';

interface IProps {
  title: boolean;
  text: string;
  textAnimation:
    | 'fromTop'
    | 'fromTopRight'
    | 'fromRight'
    | 'fromBottomRight'
    | 'fromBottom'
    | 'fromBottomLeft'
    | 'fromLeft'
    | 'fromTopLeft';
  fontSize?: string;
  className?: string;
}

const AnimatedTextWords = ({ title, text, textAnimation, className }: IProps) => {
  const words = text.split(' ');

  const textAnimationInit =
    textAnimation === 'fromTop'
      ? textFromTop
      : textAnimation === 'fromTopRight'
      ? textFromTopRight
      : textAnimation === 'fromRight'
      ? textFromRight
      : textAnimation === 'fromBottomRight'
      ? textFromBottomRight
      : textAnimation === 'fromBottom'
      ? textFromBottom
      : textAnimation === 'fromBottomLeft'
      ? textFromBottomLeft
      : textAnimation === 'fromLeft'
      ? textFromLeft
      : textFromTopLeft;

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: title ? 0.2 : 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };

  return (
    <AnimatePresence>
      <m.div
        className='z-10 flex w-full flex-row flex-wrap items-center justify-center overflow-hidden'
        variants={container}
        initial='hidden'
        whileInView='visible'
        viewport={{ margin: '-10% 0px -10% 0px', once: true }}
      >
        {words.map((word: string, index: number) =>
          title ? (
            <m.span
              className={cn('z-10 mr-2 text-4xl lowercase sm:text-5xl lg:mr-3 xl:text-6xl', className)}
              variants={textAnimationInit}
              key={index}
            >
              {word}
            </m.span>
          ) : (
            <m.span
              className={cn('text-base lowercase md:text-xl', className)}
              variants={textAnimationInit}
              key={index}
            >
              {word}
            </m.span>
          ),
        )}
      </m.div>
    </AnimatePresence>
  );
};

export default AnimatedTextWords;
