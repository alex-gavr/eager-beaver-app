import Faq from "@/components/admin/Faq";
import FutureEvent from "@/components/admin/FutureEvent";
import Pricing from "@/components/admin/Pricing";
import Review from "@/components/admin/Review";
import Teacher from "@/components/admin/Teacher";
import ThematicEvent from "@/components/admin/ThematicEvent";

interface IPageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: IPageProps) => {
  const { slug } = params;

  return (
    <section className='flex min-h-[90vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-2 py-4 lg:py-10 relative'>
      {slug === 'teachers' && <Teacher />}
      {slug === 'reviews' && <Review />}
      {slug === 'futureEvents' && <FutureEvent />}
      {slug === 'prices' && <Pricing />}
      {slug === 'faq' && <Faq />}
      {slug === 'thematicEvents' && <ThematicEvent />}
    </section>
  );
};

export default Page;
