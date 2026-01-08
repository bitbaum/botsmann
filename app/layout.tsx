import ConditionalHeader from '@/components/ConditionalHeader';
import ConditionalMain from '@/components/ConditionalMain';
import Footer from '@/components/Footer';
import './globals.css';

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
      <body className="font-sans">
        <ConditionalHeader />
        <ConditionalMain>
          {children}
        </ConditionalMain>
        <Footer />
      </body>
    </html>
  );
}
