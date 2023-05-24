export const runtime = 'edge'
export const preferredRegion = 'fra1';

import YMetrikaImg from '@/components/Metrika/YMetrikaImg';
import Providers from '@/components/Providers';
import Layout from '@/components/layout';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyles';
import { dark, light } from '@/styles/Theme';
import production from '@/utils/isProd';
import { cookies } from 'next/dist/client/components/headers';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie ? (themeCookie.value as 'light' | 'dark') : 'light';
  const themeMode = theme === 'dark' ? dark : light;

  return (
    <html lang='en'>
      <StyledComponentsRegistry>
        <Providers themeMode={themeMode}>
          <GlobalStyle />
          <body>
            <Layout theme={theme}>{children}</Layout>
            {production && <YMetrikaImg />}
          </body>
        </Providers>
      </StyledComponentsRegistry>
    </html>
  );
}
