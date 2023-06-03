import StyledLink from '@/components/StyledLink/StyledLink';

interface IPossibilitiesProps {
  item: { name: string; icon: JSX.Element; path: string };
}

const Possibilities = ({ item }: IPossibilitiesProps) => {
  return (
    <StyledLink href={item.path} variant={'secondaryGhost'} className='group min-w-[300px] lg:min-w-[400px]'>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <p className='text-black dark:text-slate-300 dark:group-hover:text-slate-900 lg:text-2xl'>
          {item.name}
        </p>
        {item.icon}
      </div>
    </StyledLink>
  );
};

export default Possibilities;
