import { Client } from 'tina/__generated__/client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export async function generateStaticParams() {
  const client = new Client({
    token: process.env.TINA_TOKEN || '',
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
    branch: process.env.BRANCH || 'main'
  });

  const postsResponse = await client.queries.postConnection();
  return postsResponse.data.postConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.filename
  })) || [];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const client = new Client({
    token: process.env.TINA_TOKEN || '',
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
    branch: process.env.BRANCH || 'main'
  });

  const response = await client.queries.post({
    relativePath: `${params.slug}.mdx`,
  });
  if (!response.data.post) {
    return <div>Post not found</div>;
  }

  const post = response.data.post;

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <div className="prose prose-lg">
        <TinaMarkdown content={post.body} />
      </div>
    </article>
  );
}
