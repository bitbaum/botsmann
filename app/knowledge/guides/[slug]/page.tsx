import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchGuideBySlug, fetchAllGuides } from '@/lib/knowledge';
import { DifficultyBadge, TableOfContents, Callout, CodeBlock } from '@/components/knowledge';
import { categoryConfig } from '@/types/knowledge';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all guides
export async function generateStaticParams() {
  const guides = await fetchAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await fetchGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | Botsmann',
    };
  }

  return {
    title: `${guide.metadata.title} | Botsmann Guides`,
    description: guide.metadata.description,
    openGraph: {
      title: guide.metadata.title,
      description: guide.metadata.description,
      type: 'article',
      publishedTime: guide.metadata.publishedAt,
      modifiedTime: guide.metadata.updatedAt,
      authors: guide.metadata.author ? [guide.metadata.author] : undefined,
      tags: guide.metadata.tags,
    },
  };
}

// MDX components for rendering
const mdxComponents = {
  Callout,
  CodeBlock,
  // Custom heading components with anchor links
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
        : '';
    return (
      <h1 id={id} className="text-3xl font-bold text-gray-900 mt-8 mb-4 scroll-mt-24" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
        : '';
    return (
      <h2 id={id} className="text-2xl font-bold text-gray-900 mt-8 mb-4 scroll-mt-24" {...props}>
        <a href={`#${id}`} className="hover:text-action transition-colors">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
        : '';
    return (
      <h3 id={id} className="text-xl font-semibold text-gray-900 mt-6 mb-3 scroll-mt-24" {...props}>
        <a href={`#${id}`} className="hover:text-action transition-colors">
          {children}
        </a>
      </h3>
    );
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-action hover:text-action underline transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-edge pl-4 py-2 my-4 bg-action-tint rounded-r-lg italic text-gray-700"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (no className means not in a code block)
    if (!className) {
      return (
        <code
          className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code blocks are handled by CodeBlock component
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
    // Extract language from code element if present
    // React 19 typed ReactElement['props'] as unknown; annotate the shape we read.
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    const className = codeElement?.props?.className || '';
    const language = className.replace('language-', '');

    return <CodeBlock language={language}>{codeElement?.props?.children}</CodeBlock>;
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200" {...props}>
      {children}
    </td>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ''}
      className="rounded-lg shadow-md my-6 max-w-full h-auto"
      {...props}
    />
  ),
};

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await fetchGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { metadata, content, tableOfContents } = guide;
  const categoryInfo = categoryConfig[metadata.category];

  // Fetch related guides (same category, different slug)
  const allGuides = await fetchAllGuides();
  const relatedGuides = allGuides
    .filter((g) => g.category === metadata.category && g.slug !== metadata.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-action-tint border-b border-edge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/knowledge" className="hover:text-action">
              Knowledge
            </Link>
            <span>/</span>
            <Link href="/knowledge/guides" className="hover:text-action">
              Guides
            </Link>
            <span>/</span>
            <Link
              href={`/knowledge/guides?category=${metadata.category}`}
              className="hover:text-action flex items-center gap-1"
            >
              <span>{categoryInfo.icon}</span>
              <span>{categoryInfo.label}</span>
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{metadata.title}</span>
          </nav>

          {/* Title and Badge */}
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{metadata.title}</h1>
            <DifficultyBadge level={metadata.difficulty} size="lg" />
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mb-6">{metadata.description}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{metadata.readTime}</span>
            </div>
            {metadata.author && (
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>By {metadata.author}</span>
              </div>
            )}
            {metadata.publishedAt && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {new Date(metadata.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Prerequisites */}
          {metadata.prerequisites && metadata.prerequisites.length > 0 && (
            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-edge">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Prerequisites</h3>
              <ul className="flex flex-wrap gap-2">
                {metadata.prerequisites.map((prereq) => (
                  <li
                    key={prereq}
                    className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
                  >
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Table of Contents - Desktop */}
          <TableOfContents items={tableOfContents} />

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Tags */}
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/knowledge/guides?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Was this guide helpful?</h3>
              <p className="text-gray-600 mb-4">
                Let us know how we can improve our documentation.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center gap-2">
                  <ThumbsUpIcon className="w-4 h-4" />
                  Yes, helpful
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2">
                  <ThumbsDownIcon className="w-4 h-4" />
                  Could be better
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/knowledge/guides/${relatedGuide.slug}`}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-action hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{categoryConfig[relatedGuide.category].icon}</span>
                    <DifficultyBadge level={relatedGuide.difficulty} size="sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
                    {relatedGuide.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedGuide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-action p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-paper mb-6 max-w-xl mx-auto">
            Put what you&apos;ve learned into practice. Start building your AI infrastructure today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/knowledge/guides"
              className="inline-flex items-center px-6 py-3 bg-white text-action font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse More Guides
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-action text-white font-semibold rounded-lg hover:bg-action-hover transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function ClockIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ThumbsUpIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  );
}

function ThumbsDownIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
      />
    </svg>
  );
}
