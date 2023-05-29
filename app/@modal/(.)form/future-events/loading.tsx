import SimpleLoading from '@/components/SimpleLoading';

interface ILoadingProps {}

const Loading = ({}: ILoadingProps) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-black/60 px-4 z-10'>
      <SimpleLoading />
    </div>
  );
};

export default Loading;
