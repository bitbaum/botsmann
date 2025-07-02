import offerings from '@/data/offerings';

export async function generateStaticParams() {
  return offerings.map((o) => ({ slug: o.slug }));
}

export const dynamic = 'force-static';
