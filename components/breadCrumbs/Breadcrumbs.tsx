import Link from 'next/link';
import { ReactNode } from 'react';
// defining the Props
export type TCrumbItem = {
  label: ReactNode; // e.g., Python
  path: string; // e.g., /development/programming-languages/python
};
export type TBreadcrumbsProps = {
  items: TCrumbItem[];
};
const Breadcrumbs = ({ items }: TBreadcrumbsProps) => {
  return (
    <div className='mb-2 ml-4 flex items-start gap-2 place-self-start rounded-xl bg-gray-100 px-4 py-2 shadow-lg dark:bg-gray-900'>
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1;
        if (!isLastItem) {
          return (
            <>
              <Link
                href={crumb.path}
                key={i}
                className='text-base uppercase tracking-widest text-blue-600 hover:text-indigo-400 hover:underline dark:text-indigo-500 dark:hover:text-indigo-400'
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span className='text-base text-gray-400'> / </span>
            </>
          );
        } else {
          return (
            <p className='text-base tracking-widest uppercase text-slate-600 dark:text-slate-300'>{crumb.label}</p>
          );
        }
      })}
    </div>
  );
};
export default Breadcrumbs;
