import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import dynamic from 'next/dynamic';

const TinaProvider = dynamic(() => import('tinacms').then((mod) => {
  const { TinaProvider } = mod;
  return function TinaWrapper({ children }: { children: React.ReactNode }) {
    return (
      <TinaProvider
        cms={new (mod.TinaCMS)({
          clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
          branch: "main",
          token: process.env.TINA_TOKEN,
          isLocalClient: Boolean(process.env.TINA_PUBLIC_IS_LOCAL),
        })}
      >
        {children}
      </TinaProvider>
    );
  };
}), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Botsmann - AI Bot Suite',
  description: 'A suite of AI-powered bots for various tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TinaProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TinaProvider>
      </body>
    </html>
  );
}
