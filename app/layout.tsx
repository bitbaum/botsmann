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

// Public project token (same string as the site snippet). Next inlines
// process.env.* at `next build` — a runtime-only .env after deploy will not
// resurrect a Script branch that was tree-shaken when the var was empty.
// Fallback keeps the embed live even if CI/box env drifts; override via env.
const FLEETCROWN_FEEDBACK_TOKEN =
  process.env.FLEETCROWN_FEEDBACK_TOKEN || 'fcw_73518de7a20c97c968d6c53bf964874d';

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
        </Providers>
        <Script
          src="https://fleetcrown.orangecat.ch/widget.js"
          strategy="afterInteractive"
          data-fc-project={FLEETCROWN_FEEDBACK_TOKEN}
          data-fc-bottom="88"
        />
      </body>
    </html>
  );
}
