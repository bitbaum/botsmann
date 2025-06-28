'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  slug: string;
  description: string;
  features: string;
}

export default function BotBuilderForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    features: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    const featureArray = formData.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Setup Instructions</h2>
        <p>
          Create a new directory <code>app/bots/{formData.slug}</code> and add
          a <code>page.tsx</code> file with your bot interface.
        </p>
        <pre className="bg-gray-50 p-4 rounded-md border text-sm overflow-auto">
{`export default function Page() {
  return <div>${formData.name} bot</div>;
}`}
        </pre>
        <p>Add this entry to <code>data/bots.ts</code>:</p>
        <pre className="bg-gray-50 p-4 rounded-md border text-sm overflow-auto">
{`{
  slug: '${formData.slug}',
  title: '${formData.name}',
  description: '${formData.description}',
  features: [${featureArray.map((f) => `'${f}'`).join(', ')}],
},`}
        </pre>
        <p>
          Run <code>npm run dev</code> and navigate to
          <code>/bots/{formData.slug}</code> to preview your bot.
        </p>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-openai-green hover:bg-opacity-90"
          onClick={() => setSubmitted(false)}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Bot Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-openai-green sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-openai-green sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-openai-green sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="features" className="block text-sm font-medium text-gray-700">
          Features (comma separated)
        </label>
        <textarea
          id="features"
          name="features"
          rows={3}
          value={formData.features}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-openai-green sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-openai-green hover:bg-opacity-90"
      >
        Generate Setup
      </button>
    </form>
  );
}

