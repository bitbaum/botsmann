'use client';
import { useState } from 'react';

const individuals = {
  highlights: ['100% data ownership', 'Works offline after setup'],
  tech: [
    'Llama-3-8B-Lex fine-tune',
    'Local Qdrant vector DB',
    'Docker Compose deployment',
  ],
};

const firms = {
  highlights: ['Handles millions of docs', 'Role-based access control'],
  tech: [
    'Llama-3-70B-Lex via vLLM',
    'Milvus 2.4 autoscaled',
    'SOC-2 ready infrastructure',
  ],
};

export default function SolutionsTabs() {
  const [active, setActive] = useState<'individuals' | 'firms'>('individuals');
  const data = active === 'individuals' ? individuals : firms;
  return (
    <section id="solutions" className="py-12">
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setActive('individuals')} className={`px-4 py-2 rounded-md ${active==='individuals'?'bg-green-600 text-white':'bg-gray-100'}`}>Individuals</button>
        <button onClick={() => setActive('firms')} className={`px-4 py-2 rounded-md ${active==='firms'?'bg-green-600 text-white':'bg-gray-100'}`}>Law Firms</button>
      </div>
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Value Highlights</h2>
        <ul className="space-y-2">
          {data.highlights.map((h) => (
            <li key={h} className="text-gray-700">{h}</li>
          ))}
        </ul>
        <h3 className="text-xl font-medium pt-4">Technology Snapshot</h3>
        <ul className="space-y-1">
          {data.tech.map(t => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </section>
  );
}
