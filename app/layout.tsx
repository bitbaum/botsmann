import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

const Header = dynamic(() => import('@/components/Header'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
