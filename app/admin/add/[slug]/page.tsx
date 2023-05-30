import Event from './Event';
import Faq from './Faq';
import Pricing from './Pricing';
import Review from './Review';
import Teacher from './Teacher';
import ThematicEvent from './ThematicEvent';

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
      {slug === 'review' && <Review />}
      {slug === 'event' && <Event />}
      {slug === 'pricing' && <Pricing />}
      {slug === 'faq' && <Faq />}
      {slug === 'thematic-event' && <ThematicEvent />}
    </section>
  );
};

export default Page;
