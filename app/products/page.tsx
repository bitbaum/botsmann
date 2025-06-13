'use client';

import { useState } from 'react';
import products, { ProductStatus, ProductType } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const statusOptions: ProductStatus[] = ['launched', 'beta', 'prototype'];
const typeOptions: ProductType[] = ['agent', 'tool', 'integration'];

export default function ProductIndex() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | ProductStatus>('all');
  const [type, setType] = useState<'all' | ProductType>('all');

  const filtered = products.filter((p) => {
    return (
      (status === 'all' || p.status === status) &&
      (type === 'all' || p.type === type) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()))
    );
  });

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Products</h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full flex-1 rounded border border-gray-300 px-3 py-2 sm:w-auto"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProductStatus | 'all')}
          className="rounded border border-gray-300 px-3 py-2"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as ProductType | 'all')}
          className="rounded border border-gray-300 px-3 py-2"
        >
          <option value="all">All Types</option>
          {typeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
        {filtered.length === 0 && <p>No products match your search.</p>}
      </div>
    </div>
  );
}
