import Link from 'next/link';
import solutions from '@/data/solutions';

export const metadata = { title: 'Sitemap' };

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Sitemap</h1>
      <ul className="space-y-2 list-disc pl-4">
        <li>
          <Link href="/solutions" className="text-openai-green hover:underline">
            Solutions
          </Link>
        </li>
        {solutions.map((s) => (
          <li key={s.slug} className="ml-4">
            <Link href={`/solutions/${s.slug}`} className="text-openai-green hover:underline">
              {s.title}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/blog" className="text-openai-green hover:underline">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-openai-green hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-openai-green hover:underline">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}
