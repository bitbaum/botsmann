'use client';

import { useRef, useEffect, useState } from 'react';

export default function Comments({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-mount detection for SSR-safe giscus embed
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content first
    container.innerHTML = '';

    // Create giscus script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'g-but/botsmann-blog-content');
    script.setAttribute('data-repo-id', 'R_kgDOODOnUA');
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOODOnUM4CnkL1');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);

    return () => {
      // Manually clean up all children using innerHTML to prevent React reconciliation errors
      // This runs before React tries to reconcile the DOM
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [slug, isClient]);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Comments</h2>
      <div ref={containerRef} className="giscus-container">
        {!isClient && <div className="text-gray-500">Loading comments...</div>}
      </div>
    </div>
  );
}
