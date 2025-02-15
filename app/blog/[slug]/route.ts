import { type NextRequest } from 'next/server';

export async function generateStaticParams() {
  return [
    { slug: 'welcome-to-botsmann' },
    { slug: 'transparency-revolution' },
    { slug: 'future-of-shopping' }
  ];
}

export const dynamic = 'force-static';
