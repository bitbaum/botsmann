import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { site } from '@/lib/site';
import './globals.css';
import { Toaster } from 'sonner';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';

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
  // Load-bearing: Next resolves the generated og:image against metadataBase.
  // Without it the tag is emitted as http://localhost:3000/opengraph-image —
  // present, plausible, and unfetchable by every social scraper.
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const feedbackToken = process.env.FLEETCROWN_FEEDBACK_TOKEN;
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
        </Providers>
        {feedbackToken ? (
          <Script
            src="https://fleetcrown.orangecat.ch/widget.js"
            strategy="afterInteractive"
            data-fc-project={feedbackToken}
            data-fc-bottom="88"
          />
        ) : null}
      </body>
    </html>
  );
}
