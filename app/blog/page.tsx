import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'welcome-to-botsmann',
    title: 'Welcome to Botsmann: AI Solutions for Human Progress',
    excerpt: 'Discover how our suite of specialized AI bots and innovative projects are transforming industries and promoting transparency.',
    date: '2024-03-15',
    author: 'Botsmann Team'
  },
  {
    slug: 'transparency-revolution',
    title: 'The Transparency Revolution: Technology for Public Good',
    excerpt: 'Exploring how our government spending tracker is bringing unprecedented transparency to public finance.',
    date: '2024-03-14',
    author: 'Botsmann Team'
  },
  {
    slug: 'future-of-shopping',
    title: 'The Future of Shopping: One Word is All You Need',
    excerpt: 'How our AI shopping assistant is revolutionizing e-commerce with natural language understanding.',
    date: '2024-03-13',
    author: 'Botsmann Team'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Insights and updates from the Botsmann team on AI, technology, and innovation.
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                <Link 
                  href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}
                  className="hover:text-openai-green"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 text-gray-600">{post.excerpt}</p>
              <div className="mt-4">
                <Link
                  href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}
                  className="inline-flex items-center text-sm font-medium text-openai-green hover:text-opacity-80"
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
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
