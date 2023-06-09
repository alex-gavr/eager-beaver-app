import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';

const style = 'backdrop-blur-lg';
const buttonVariants = cva(
  'active:scale-95 tracking-widest inline-flex items-center justify-center text-xs sm:text-base lg:text-xl 2xl:text-2xl transition-colors duration-500 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border bg-slate-900 text-white border-primary-500 hover:bg-slate-700 dark:bg-slate-800 dark:border-slate-500 dark:text-white dark:hover:bg-slate-700',
        defaultGhost:
          'border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-700 hover:text-slate-200  dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800',
        primary:
          'border bg-primary-500 text-slate-950 border-primary-800 hover:bg-primary-200 dark:bg-primary-800 dark:text-slate-950 dark:hover:bg-primary-200',
        primaryGhost:
          'border border-primary-800 text-slate-950 bg-transparent hover:bg-primary-200  dark:border-primary-800 dark:text-slate-200 dark:hover:bg-primary-200 dark:hover:text-slate-900',
        secondary:
          'border bg-accent-500 text-gray-900 border-accent-800  hover:bg-accent-200   dark:bg-accent-800 dark:text-gray-950  dark:hover:bg-accent-200 dark:border-accent-800',
        secondaryGhost:
          'border border-accent-800 text-gray-950 bg-transparent hover:bg-accent-200 dark:text-gray-200 dark:border-accent-800 dark:hover:bg-accent-200 dark:hover:text-gray-900',
        hero: 'bg-white bg-opacity-20 border border-accent-200 backdrop-filter backdrop-blur-sm sm:bg-opacity-20',

        success: 'bg-emerald-600 text-neutral-50 hover:bg-emerald-300 hover:text-neutral-900',
        successSecondary: 'border border-emerald-600 text-neutral-900',
        danger: 'bg-red-700 text-neutral-50 hover:bg-red-600 hover:text-neutral-50',
      },
      size: {
        default: 'p-4',
        sm: 'p-2',
        lg: 'px-6 py-4',
      },
      font: {
        default: 'koskoBold',
        regular: 'koskoRegular',
      },
      rounded: {
        default: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      font: 'default',
      rounded: 'default',
    },
  },
);


export type NavLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement> &  VariantProps<typeof buttonVariants>

const StyledLink = ({
  href,
  children,
  onClick,
  className,
  variant,
  size,
  font,
  rounded,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, font, rounded, className }))}
      {...props}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
