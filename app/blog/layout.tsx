import React from 'react';
import dynamic from 'next/dynamic';
import { MDXContent as MDXContentType } from './mdx-provider';

const MDXContent = dynamic<MDXContentType>(
  () => import('./mdx-provider').then(mod => mod.default),
  { ssr: true }
);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="prose prose-gray mx-auto">
          <MDXContent>{children}</MDXContent>
        </div>
      </div>
    </div>
  );
}
