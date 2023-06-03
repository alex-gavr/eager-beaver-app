import { IServerProps } from '@/app/page';
import { db } from '@/db/db';
import dynamic from 'next/dynamic';
import { IEventsData, faq, futureEvents, prices, reviews, teachers, thematicEvents } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import SimpleLoading from '@/components/SimpleLoading';

const Faq = dynamic(() => import('@/components/admin/Faq'), { ssr: false, loading: () => <SimpleLoading /> });
const FutureEvent = dynamic(() => import('@/components/admin/FutureEvent'), {
  ssr: false,
  loading: () => <SimpleLoading />,
});
const Pricing = dynamic(() => import('@/components/admin/Pricing'), {
  ssr: false,
  loading: () => <SimpleLoading />,
});
const Review = dynamic(() => import('@/components/admin/Review'), {
  ssr: false,
  loading: () => <SimpleLoading />,
});
const Teacher = dynamic(() => import('@/components/admin/Teacher'), {
  ssr: false,
  loading: () => <SimpleLoading />,
});
const ThematicEvent = dynamic(() => import('@/components/admin/ThematicEvent'), {
  ssr: false,
  loading: () => <SimpleLoading />,
});

interface IPageProps {}

const Page = async ({ params, searchParams }: IServerProps) => {
  const { id, slug } = params;

  if (id === null || slug === null) {
    return null;
  }

  if (slug === 'teachers') {
    const data = await db.select().from(teachers).where(eq(teachers.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Teacher dbData={data[0]} />
      </div>
    );
  }

  if (slug === 'faq') {
    const data = await db.select().from(faq).where(eq(faq.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Faq dbData={data[0]} />
      </div>
    );
  }

  if (slug === 'futureEvents') {
    const data = await db.select().from(futureEvents).where(eq(futureEvents.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <FutureEvent dbData={data[0]} />
      </div>
    );
  }

  if (slug === 'prices') {
    const data = await db.select().from(prices).where(eq(prices.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Pricing dbData={data[0]} />
      </div>
    );
  }

  if (slug === 'reviews') {
    const data = await db.select().from(reviews).where(eq(reviews.uuid, id));

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <Review dbData={data[0]} />
      </div>
    );
  }

  if (slug === 'thematicEvents') {
    const data = await db.select().from(thematicEvents).where(eq(thematicEvents.uuid, id));

    const d = data.map((d) => {
      return {
        ...d,
        images: JSON.parse(d.images),
      };
    })[0] as IEventsData;

    return (
      <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
        <ThematicEvent dbData={d} />
      </div>
    );
  }
};

export default Page;
