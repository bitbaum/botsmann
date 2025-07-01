'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { generateSlug } from '@/src/lib/slug';

interface FormData {
  name: string;
  description: string;
}

export default function BotBuilderForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setSubmitted(true);
  };

  const name = watch('name') || '';
  const slug = generateSlug(name);

  if (submitted) {
    return <p className="text-green-700">Bot submitted successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" {...register('name', { required: true })} className="w-full border p-2" />
        {errors.name && <p className="text-red-600">Name is required</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea id="description" {...register('description')} className="w-full border p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input type="text" value={slug} readOnly className="w-full border p-2 bg-gray-100" />
      </div>
      <button type="submit" className="px-4 py-2 bg-openai-green text-white rounded">Create Bot</button>
    </form>
  );
}
