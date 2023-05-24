import Schedule from './Schedule';
import { db } from '@/db/db';
import { TFutureEvents, futureEvents } from '@/db/schemas';

interface IPageProps {}

export const metadata = {
  title: 'Мероприятия',
  description: 'Предстоящие мероприятия в Eager Beaver!',
};

const Page = async ({}: IPageProps) => {
  const futureEventsData = (await db.select().from(futureEvents)) as TFutureEvents[];

  return (
    <>
      <Schedule futureEvents={futureEventsData} />
    </>
  );
};

export default Page;
