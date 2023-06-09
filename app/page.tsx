// export const revalidate = '60';
import { Metadata } from 'next';
import Home from './home';
import { db } from '@/db/db';
import { IEventsData, TFutureEvents, TThematicEvents, futureEvents, thematicEvents } from '@/db/schemas';

export const metadata: Metadata = {
  title: 'Eager Beaver Language School | Волгоград',
  description:
    'Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным процессом. Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы. Проведение таких мероприятий для нас является неотъемлемой частью образования.',
};

export interface IServerProps {
  params: {
    slug: 'futureEvents' | 'teachers' | 'reviews' | 'thematicEvents' | 'prices' | 'faq';
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async () => {
  const futureEventsRequest = db.select().from(futureEvents);
  const themeEventsRequest = db.select().from(thematicEvents);

  const [futureEventsData, themeEventsData] = await Promise.all([futureEventsRequest, themeEventsRequest]);

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
