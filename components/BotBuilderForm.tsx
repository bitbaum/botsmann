'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface FormData {
  type: string;
  name: string;
  slug: string;
  description: string;
  features: string;
}

const featurePresets: Record<string, string> = {
  'Customer Support': 'FAQ answering, Ticket creation, Live chat',
  'Content Writer': 'Generate blog posts, Summarize articles, Outline ideas',
  'Research Assistant': 'Search references, Track citations, Summarize papers'
};

const initialData: FormData = {
  type: '',
  name: '',
  slug: '',
  description: '',
  features: ''
};

const steps = ['Assistant Type', 'Bot Details', 'Setup'];

export default function BotBuilderForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      setFormData((prev) => ({
        ...prev,
        features: featurePresets[prev.type] || prev.features
      }));
      setStep(2);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/bots/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Failed to save bot', err);
    } finally {
      setSaving(false);
      setStep(3);
    }
  };

  const startOver = () => {
    setFormData(initialData);
    setStep(1);
  };

  const featureArray = formData.features
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <ol className="flex items-center justify-between text-sm font-medium">
        {steps.map((label, idx) => (
          <li key={label} className="flex-1 flex items-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${idx + 1 <= step ? 'bg-openai-green text-white border-openai-green' : 'text-gray-500 border-gray-300'}`}
            >
              {idx + 1}
            </span>
            <span className="ml-2 text-gray-700 hidden sm:inline">{label}</span>
            {idx < steps.length - 1 && <span className="flex-1 h-px bg-gray-300 mx-2" />}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="space-y-6">
          <RadioGroup value={formData.type} onChange={(val) => setFormData((p) => ({ ...p, type: val }))}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">Assistant Type</RadioGroup.Label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(featurePresets).map((t) => (
                <RadioGroup.Option
                  key={t}
                  value={t}
                  className={({ checked }) => `cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${checked ? 'bg-openai-green/10 border-openai-green text-openai-green' : 'bg-white border-gray-300'}`}
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between">
                      <span>{t}</span>
                      {checked && <CheckIcon className="h-5 w-5" />}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
              <RadioGroup.Option
                value="Custom"
                className={({ checked }) => `cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${checked ? 'bg-openai-green/10 border-openai-green text-openai-green' : 'bg-white border-gray-300'}`}
              >
                {({ checked }) => (
                  <div className="flex items-center justify-between">
                    <span>Custom</span>
                    {checked && <CheckIcon className="h-5 w-5" />}
                  </div>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
          <div className="text-right">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 rounded-md bg-openai-green text-white shadow disabled:opacity-50"
              disabled={!formData.type}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center px-4 py-2 rounded-md border bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md bg-openai-green text-white shadow disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Generate Setup'}
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Setup Instructions</h2>
          <p>
            Create a new directory <code>app/bots/{formData.slug}</code> and add a <code>page.tsx</code> file with your bot interface.
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
            Run <code>npm run dev</code> and navigate to <code>/bots/{formData.slug}</code> to preview your bot.
          </p>
          <div className="text-right">
            <button
              className="inline-flex items-center px-4 py-2 rounded-md bg-openai-green text-white shadow"
              onClick={startOver}
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
