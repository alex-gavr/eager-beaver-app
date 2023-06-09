import React, { FC } from 'react';
import { m } from 'framer-motion';

const Path = (props: any) => <m.path fill='transparent' className='stroke-black dark:stroke-white' strokeWidth='3' stroke='hsl(0, 0%, 18%)' strokeLinecap='round' {...props} />;

interface Props {
    toggle: () => void;
}

export const MenuToggle: FC<Props> = ({ toggle }) => (
    <button className='outline-none w-full h-full bg-transparent translate-x-[1px] translate-y-[1px]' onClick={toggle} type='button' aria-label="menu toggler">
        <svg width='30' height='30' viewBox='0 0 23 23'>
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d='M 2 9.423 L 20 9.423'
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </button>
);
