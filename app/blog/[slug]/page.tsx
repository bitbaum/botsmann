'use client';

import { useTina } from 'tinacms/dist/react';
import { MDXRemote } from 'next-mdx-remote';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { data } = useTina({
    query: `query getPost($relativePath: String!) {
      post(relativePath: $relativePath) {
        title
        date
        body
      }
    }`,
    variables: { relativePath: `${params.slug}.mdx` },
    data: {
      post: {
        title: '',
        date: '',
        body: {
          compiledSource: '',
          scope: {}
        }
      }
    },
  });

  if (!data?.post) return <div>Loading...</div>;

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.post.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(data.post.date).toLocaleDateString()}
      </time>
      <div className="prose prose-lg">
        <MDXRemote {...data.post.body} />
      </div>
    </article>
  );
}
