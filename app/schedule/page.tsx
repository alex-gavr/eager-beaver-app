import Schedule from './Schedule';

interface IPageProps {}

export const metadata = {
  title: 'Мероприятия',
  description: 'Предстоящие мероприятия в Eager Beaver!',
};

const Page = async ({}: IPageProps) => {
  return (
    <>
      <Schedule />
    </>
  );
};

export default Page;
