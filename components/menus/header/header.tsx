'use client';
import { m } from 'framer-motion';
import MobileMenu from './mobile-menu';
import { MenuToggle } from './menu-toggle';
import { header } from '../links';
import { list, mobileHeaderAni } from '@/utils/motion-animations';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Logo } from '@/components/logo/logo';
import { useWindowSize } from 'usehooks-ts';
import { useAppContext } from '@/context/Context';
import { ActionsType } from '@/context/actionsTypes';

const Header = () => {
  const { width } = useWindowSize();
  // const dispatch = useAppDispatch();
  const { dispatch } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { ref, inView } = useInView({});

  useEffect(() => {
    dispatch({ type: ActionsType.setHeaderVisibility, payload: inView });
  }, [inView]);

  return (
    <header className='w-full px-2 py-3' ref={ref}>
      <div className='flex w-full flex-row flex-nowrap items-center justify-between px-2'>
        {/* Logo */}
        <Logo />
        {/* NAVIGATION DESKTOP */}
        {width > 1000 ? (
          <nav>
            <m.ul
              className='flex flex-row flex-nowrap items-center justify-center gap-x-8 gap-y-4'
              variants={list}
              initial='hidden'
              animate='visible'
            >
              {header.map((link) => (
                <m.li
                  className='koskoBold'
                  variants={mobileHeaderAni}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  key={link.id}
                >
                  <Link
                    className='p-4 text-sm tracking-wider hover:rounded-2xl hover:bg-accent-800 hover:text-slate-50 xl:text-base'
                    href={link.to}
                  >
                    {link.name}
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </nav>
        ) : (
          <>
            <MobileMenu header={header} isOpen={isOpen} toggle={handleToggle} />
            <m.div
              className='z-[999] flex items-center justify-center rounded-full bg-primary-200 p-4 px-5 dark:bg-slate-900'
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              onClick={handleToggle}
            >
              <MenuToggle toggle={handleToggle} />
            </m.div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
