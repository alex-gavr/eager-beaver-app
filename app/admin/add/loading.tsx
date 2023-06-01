interface ILoadingProps {}

const Loading = ({}: ILoadingProps) => {
  return (
    <div className='flex min-h-[90vh] w-full flex-col items-center justify-center gap-4'>
      {/* Heading */}
      <span className='mb-8 h-10 w-1/3 animate-pulse rounded-md bg-slate-300' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {[0, 1, 2].map((_, i) => (
          <div key={i} className='flex w-full min-w-[300px] flex-row items-center justify-between gap-4 rounded-md border border-accent-800 px-4 py-6'>
            {/* Text */}
            <span className='h-7 w-40 animate-pulse rounded-md bg-slate-200' />
            {/* Icon */}
            <span className='h-7 w-7 animate-pulse rounded-full bg-slate-800' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
