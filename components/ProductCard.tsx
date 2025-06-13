import React from 'react';
import Link from 'next/link';
import type { Product } from '@/data/products';

const statusStyles: Record<Product['status'], string> = {
  launched: 'bg-emerald-500/10 text-emerald-700',
  beta: 'bg-amber-500/10 text-amber-700',
  prototype: 'bg-slate-600/10 text-slate-700',
};

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${compact ? 'p-4' : ''}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className={`font-semibold text-gray-900 ${compact ? 'text-lg' : 'text-xl mb-1'}`}>{product.name}</h2>
          {!compact && <p className="text-sm capitalize text-gray-500">{product.type}</p>}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyles[product.status]}`}>{product.status}</span>
      </div>
      {!compact && <p className="mb-4 flex-1 text-gray-600">{product.excerpt}</p>}
      <span className="mt-auto text-sm font-medium text-openai-green group-hover:underline">
        Learn more →
      </span>
    </Link>
  );
}
