import React from 'react';
import dynamic from 'next/dynamic';

const MDXProviderWrapper = dynamic(() => import('./mdx-provider').then(mod => mod.MDXProviderWrapper), {
  ssr: false
});

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
