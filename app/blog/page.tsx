import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import type { Route } from 'next';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog | Kigott',
  description: 'Insights and updates from the Kigott team on AI, technology, and innovation.',
  openGraph: {
    title: 'Blog | Kigott',
    description: 'Insights and updates from the Kigott team on AI, technology, and innovation.',
    url: 'https://kigott.com/blog',
    siteName: 'Kigott',
    type: 'website',
  }
};

export default async function Blog() {
  const blogPosts = await fetchBlogPosts();
  
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Insights and updates from the Kigott team on AI, technology, and innovation.
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:gap-8">
                  {post.featuredImage && (
                    <div className="md:w-1/3 mb-6 md:mb-0">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <Image 
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={post.featuredImage ? "md:w-2/3" : "w-full"}>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                      <Link 
                        href={`/blog/${post.slug}` as Route}
                        className="hover:text-brand-500"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="mt-4 text-gray-600">{post.excerpt}</p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link
                      href={`/blog/${post.slug}` as Route}
                      className="mt-6 inline-flex items-center text-sm font-medium text-brand-500 hover:text-opacity-80"
                    >
                      Read more
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
