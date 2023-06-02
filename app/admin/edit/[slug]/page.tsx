import { IServerProps } from '@/app/page';
import StyledLink from '@/components/StyledLink/StyledLink';
import { db } from '@/db/db';
import { faq, futureEvents, prices, reviews, teachers, thematicEvents } from '@/db/schemas';

interface IPageProps {}

const Page = async ({ params, searchParams }: IServerProps) => {
  const { slug } = params;

  if (slug === null) {
    return null;
  }

  if (slug === 'teachers') {
    const data = await db.select({ uuid: teachers.uuid, name: teachers.fullName }).from(teachers);
    return <DeletionOptions data={data} params={params} />;
  }

  if (slug === 'faq') {
    const data = await db.select({ uuid: faq.uuid, name: faq.question }).from(faq);
    return <DeletionOptions data={data} params={params} />;
  }

  if (slug === 'futureEvents') {
    const data = await db
      .select({ uuid: futureEvents.uuid, name: futureEvents.eventName })
      .from(futureEvents);
    return <DeletionOptions data={data} params={params} />;
  }

  if (slug === 'prices') {
    const data = await db.select({ uuid: prices.uuid, name: prices.price }).from(prices);
    return <DeletionOptions data={data} params={params} />;
  }

  if (slug === 'reviews') {
    const data = await db.select({ uuid: reviews.uuid, name: reviews.childName }).from(reviews);
    return <DeletionOptions data={data} params={params} />;
  }

  if (slug === 'thematicEvents') {
    const data = await db
      .select({ uuid: thematicEvents.uuid, name: thematicEvents.heading })
      .from(thematicEvents);
    return <DeletionOptions data={data} params={params} />;
  }
};

export default Page;

type TDate = {
  uuid: string;
  name: string;
};
interface TDeletionOptionsProps extends Omit<IServerProps, 'searchParams'> {
  data: Array<TDate>;
}

const DeletionOptions = ({ data, params }: TDeletionOptionsProps) => {
  const { slug } = params;
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl lg:text-5xl'>Выбирай</h1>
      <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4 p-10'>
        {data.map((item) => (
          <div
            className='flex w-full max-w-lg flex-row items-center justify-between rounded-xl bg-gradient-to-tl from-violet-800 to-fuchsia-900 p-4'
            key={item.uuid}
          >
            <p className=' text-white lg:text-2xl dark:text-slate-300'>{item.name}</p>
            <StyledLink
              variant={'primaryGhost'}
              href={`/admin/edit/${slug}/${item.uuid}`}
              className='text-primary-800'
            >
              edit
            </StyledLink>
          </div>
        ))}
      </div>
    </div>
  );
};
