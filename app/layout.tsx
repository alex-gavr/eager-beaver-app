export const runtime = 'edge';
export const preferredRegion = 'fra1';

import '@/styles/globals.css';
import YMetrikaImg from '@/components/Metrika/YMetrikaImg';
import Providers from '@/components/Providers';
import Layout from '@/components/layout';
import production from '@/utils/isProd';
import { cookies } from 'next/dist/client/components/headers';
import { KoskoBold, KoskoRegular } from '@/Fonts/Fonts';
import { cn } from '@/utils/cn';
import Header from '@/components/menus/header/header';
import { Analytics } from '@vercel/analytics/react';
import YMetrika from '@/components/Metrika/YMetrika';
import Footer from '@/components/menus/footer/footer';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

interface IRootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: IRootLayoutProps) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie ? (themeCookie.value as 'light' | 'dark') : 'light';

  return (
    <html
      lang='en'
      className={cn(`${KoskoBold.variable}`, `${KoskoRegular.variable}`, theme === 'dark' ? 'dark' : '')}
    >
      <Providers>
        <Analytics />
        <body>
          <div className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
            <Header />
            <Layout theme={theme}>{children}</Layout>
            {modal}
            {production && <YMetrikaImg />}
            <Footer />
          </div>
        </body>
      </Providers>
      {production && <YMetrika />}
    </html>
  );
}
