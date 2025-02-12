import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { TinaEditProvider } from 'tinacms';

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
        <TinaEditProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TinaEditProvider>
      </body>
    </html>
  );
}
