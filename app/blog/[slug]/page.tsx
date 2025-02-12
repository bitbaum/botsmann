export async function generateStaticParams() {
  return [];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Blog Post</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date().toLocaleDateString()}
      </time>
      <div className="prose prose-lg">
        <p>This page is under construction.</p>
      </div>
    </article>
  );
}
