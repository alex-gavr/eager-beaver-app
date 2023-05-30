import SocialMediaIcons from './SocialMediaIcons';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import { m } from 'framer-motion';
import { useAppContext } from '@/context/Context';

const FixedSocialMedia = () => {
  const { width } = useWindowSize();
  const { state } = useAppContext();
  const footerVisible = state.footerVisible
  const headerVisible = state.headerVisible

  return (
    <AnimatePresence>
      {width > 700 ? (
        <m.div
          className='fixed top-[50%] z-[800] flex -translate-y-[50%] flex-col items-center justify-center gap-8'
          initial={{ right: '-10%', opacity: 0 }}
          animate={
            footerVisible || headerVisible ? { right: '-10%', opacity: 0 } : { right: '2%', opacity: 1 }
          }
          transition={{ ease: 'easeInOut', duration: 1 }}
        >
          <SocialMediaIcons />
        </m.div>
      ) : (
        <m.div
          className='fixed bottom-4 z-[800] flex flex-col items-center justify-center'
          initial={{ right: '-15%' }}
          animate={headerVisible ? { right: '-15%' } : { right: '4%' }}
          transition={{ ease: 'easeInOut', duration: 1 }}
        >
          <a href='https://wa.me/79093809657' aria-label='WhatsApp' target='_blank' rel='noopener noreferrer'>
            <Image src={'/whatsapp.svg'} width={50} height={50} alt='' />
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default FixedSocialMedia;
