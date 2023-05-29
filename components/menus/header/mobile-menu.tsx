import { FC, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import logo from '@/images/logo.svg';
import { useScrollBlock } from '@/utils/blockScroll';
import { list, toDown, beaver, headerSidebar } from '@/utils/motion-animations';
import { ILink } from '@/types/data';

interface IProps {
  header: ILink[];
  isOpen: boolean;
  toggle: () => void;
}

const MobileMenu: FC<IProps> = ({ header, isOpen, toggle }): JSX.Element => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
      document.querySelector('body')?.scrollTo(0, 0);
    } else {
      allowScroll();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <nav className='z-[900] flex flex-col items-center justify-center gap-10 px-8 py-3'>
          <m.div
            className='mobileMenuBg absolute bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center'
            variants={headerSidebar}
            animate='open'
            initial='closed'
          >
            <div className='flex h-[70vh] flex-col items-center justify-around'>
              <m.ul
                className='flex w-[70%] flex-row flex-wrap items-center justify-center gap-12'
                variants={list}
                initial='hidden'
                animate='visible'
              >
                {header.map((link: any) => (
                  <m.li variants={toDown} onClick={toggle} key={link.id}>
                    <Link
                      className='koskoBold inline-flex rounded-2xl bg-accent-800 p-4 text-center tracking-widest text-neutral-900 dark:text-neutral-900 sm:text-base'
                      href={link.to}
                    >
                      {link.name}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </div>
            <m.div
              className='absolute left-0 top-0 flex w-3/5 items-center justify-center sm:w-2/5 md:w-4/12'
              variants={beaver}
              initial='hidden'
              animate='visible'
            >
              <Image src={logo} alt='' loading='eager' className='w-full' />
            </m.div>
          </m.div>
        </nav>
      )}
    </>
  );
};
export default MobileMenu;
