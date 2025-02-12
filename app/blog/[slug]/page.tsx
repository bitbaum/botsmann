import { TinaMarkdown } from 'tinacms/dist/rich-text';

// For development, we'll use static data until TinaCMS is fully configured
export async function generateStaticParams() {
  return [];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Mock data for development
  const post = {
    title: 'Sample Post',
    date: new Date().toISOString(),
    _body: 'Sample content'
  };

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <div className="prose prose-lg">
        <div className="prose">{post._body}</div>
      </div>
    </article>
  );
}
