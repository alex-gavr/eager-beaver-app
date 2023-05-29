import FormSuccess from "./FormSuccess";


const SuccessPage = () => {
  return (
    <main className='flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden'>
      <section className='relative flex max-w-[1500px] flex-col items-center justify-center gap-8 rounded-xl bg-slate-200 px-2 py-8 xl:p-16'>
        <FormSuccess />
      </section>
    </main>
  );
};
export default SuccessPage;
