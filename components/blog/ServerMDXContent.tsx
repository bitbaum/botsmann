import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

// Server-compatible MDX components (no hooks allowed)
const ServerMDXComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-8 text-4xl font-semibold tracking-tight text-gray-900" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-4 mt-8 text-2xl font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-4 mt-6 text-xl font-semibold text-gray-900" {...props} />
  ),

  // Text elements - handle block elements that MDX might wrap in <p>
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    // Check if children contain block-level elements (images wrapped in figure)
    // If so, render as a div to avoid invalid HTML nesting
    const hasBlockChild = React.Children.toArray(children).some((child) => {
      if (React.isValidElement(child)) {
        // Check for figure, div, or other block elements
        const type = child.type;
        if (typeof type === 'string' && ['figure', 'div', 'section'].includes(type)) {
          return true;
        }
        // Check for custom components that render block elements
        if (typeof type === 'function' || typeof type === 'object') {
          return true;
        }
      }
      return false;
    });

    if (hasBlockChild) {
      return (
        <div className="mb-4 text-gray-600" {...props}>
          {children}
        </div>
      );
    }

    return (
      <p className="mb-4 text-gray-600" {...props}>
        {children}
      </p>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc pl-6 text-gray-600" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal pl-6 text-gray-600" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="mb-2" {...props} />,
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className="text-action hover:text-opacity-80"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    return (
      <Link
        href={(href || '/') as Route}
        className="text-action hover:text-opacity-80"
        {...props}
      />
    );
  },

  // Custom components
  YouTube: ({ id }: { id: string }) => (
    <div className="my-8 aspect-video overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ),

  Tweet: ({ id }: { id: string }) => (
    <div className="my-8">
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${id}`}>Loading tweet...</a>
      </blockquote>
    </div>
  ),

  // Callout component for important information
  Callout: ({
    children,
    type = 'info',
  }: {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'success';
  }) => {
    const styles = {
      info: 'bg-action-tint border-edge text-action',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    };

    const safeType = type && ['info', 'warning', 'success'].includes(type) ? type : 'info';

    return <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[safeType]}`}>{children}</div>;
  },
};

interface ServerMDXContentProps {
  content: string;
  slug: string;
}

export default function ServerMDXContent({ content, slug }: ServerMDXContentProps) {
  // Create components with slug context for images
  const componentsWithContext = {
    ...ServerMDXComponents,
    img: (imgProps: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt } = imgProps;

      // React 19 widened ImgHTMLAttributes['src'] to string | Blob; MDX only ever
      // passes string paths, so narrow before the string operations below.
      if (!src || typeof src !== 'string') {
        return <span className="block my-8 p-4 bg-red-50 text-red-500">Image source missing</span>;
      }

      let imageSrc = src;

      // Transform relative paths to GitHub raw URLs
      if (src.startsWith('./') || src.startsWith('../')) {
        const imagePath = src.replace(/^\.\//, '');
        imageSrc = `https://raw.githubusercontent.com/g-but/botsmann-blog-content/main/posts/${slug}/${imagePath}`;
      }

      // Use figure/figcaption for semantic HTML that avoids <p> nesting issues
      return (
        <figure className="my-8">
          <Image src={imageSrc} alt={alt || ''} width={800} height={450} className="rounded-lg" />
          {alt && <figcaption className="mt-2 text-sm text-gray-500 italic">{alt}</figcaption>}
        </figure>
      );
    },
  };

  return (
    <div className="prose prose-gray max-w-none">
      <MDXRemote
        source={content}
        components={componentsWithContext}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
          },
        }}
      />
    </div>
  );
}
