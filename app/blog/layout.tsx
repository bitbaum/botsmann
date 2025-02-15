import React from 'react';
import { MDXProviderWrapper } from './mdx-provider';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="prose prose-gray mx-auto">
          <MDXProviderWrapper>{children}</MDXProviderWrapper>
        </div>
      </div>
    </div>
  );
}
