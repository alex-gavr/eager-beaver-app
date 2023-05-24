export const revalidate = '60';
import { Metadata } from 'next';
import Home from './home';
import { db } from '@/db/db';
import { IEventsData, TFutureEvents, TThematicEvents, futureEvents, thematicEvents } from '@/db/schemas';

export const metadata: Metadata = {
  title: 'Eager Beaver Language School | Волгоград',
  description:
    'Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным процессом. Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы. Проведение таких мероприятий для нас является неотъемлемой частью образования.',
};

const Page = async () => {
  const futureEventsData = (await db.select().from(futureEvents)) as TFutureEvents[];

  const themeEventsData = (await db.select().from(thematicEvents)) as TThematicEvents[];

  const themeEvents = themeEventsData.map((event) => {
    return {
      ...event,
      images: JSON.parse(event.images),
    };
  }) as IEventsData[];

  return (
    <>
      <Home futureEvents={futureEventsData} themeEvents={themeEvents} />
    </>
  );
};

export default Page;
