import { Metadata } from 'next';
import Policy from './Policy';

interface IPageProps {}

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const Page = ({}: IPageProps) => {
  return (
    <>
      <Policy />
    </>
  );
};

export default Page;
