import { Metadata } from 'next';
import Contact from './Contact';

interface IPageProps {}

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Как связаться? Где находитесь? И как добраться? Ответы есть здесь!',
};

const Page = ({}: IPageProps) => {
  return (
    <>
      <Contact />
    </>
  );
};

export default Page;
