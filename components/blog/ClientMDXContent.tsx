'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from './MDXComponents';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import logger from '@/src/lib/logger';

export default function ClientMDXContent({ content, slug }: { content: string; slug: string }) {
  // Create a complete components map including the slug context for images
  const componentsWithContext = {
    ...MDXComponents,
    img: (imgProps: any) => {
      logger.debug({ src: imgProps.src, slug }, 'Rendering client img');
      return MDXComponents.img({
        ...imgProps,
        slug
      });
    },
    // Ensure Callout is explicitly passed as a prop to avoid the "Expected component `Callout` to be defined" error
    Callout: MDXComponents.Callout
  };

  return (
    <div className="prose prose-gray max-w-none">
      <MDXRemote 
        source={content} 
        components={componentsWithContext}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
          }
        }}
      />
    </div>
  );
} 