import products from '@/data/products';
import { notFound } from 'next/navigation';
import type { Product } from '@/data/products';

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

const statusStyles: Record<Product['status'], string> = {
  launched: 'bg-emerald-500/10 text-emerald-700',
  beta: 'bg-amber-500/10 text-amber-700',
  prototype: 'bg-slate-600/10 text-slate-700',
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-screen-md px-6 py-12">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">{product.name}</h1>
      <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyles[product.status]}`}>{product.status}</span>
      <p className="mt-4 text-gray-600">{product.excerpt}</p>
      <p className="mt-6 text-gray-700 whitespace-pre-line">{product.description}</p>
    </div>
  );
}
