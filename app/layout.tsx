import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { site } from '@/lib/site';
import './globals.css';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Fraunces } from 'next/font/google';

// Brand typeface: a serif display (Fraunces) carries the editorial / "real
// counsel" identity for headings & wordmark; Inter handles UI/body copy.
// Bound to CSS vars consumed by tailwind.config (font-serif / font-sans).
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-paper font-sans text-ink">
        <Providers>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
