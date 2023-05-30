
interface IPageProps {}

const Page = ({}: IPageProps) => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <h1 className='text-3xl'>Slug page</h1>
    </div>
  );
};

export default Page;
