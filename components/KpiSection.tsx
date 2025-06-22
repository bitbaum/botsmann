import React from 'react';

export default function KpiSection() {
  const kpis = [
    { value: '100%', label: 'Data Ownership' },
    { value: '30%+', label: 'Faster Workflows' },
    { value: '0', label: 'Required Cloud Usage' }
  ];

  return (
    <section className="my-16">
      <div className="mx-auto max-w-screen-xl px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Key Benefits</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-4xl font-bold text-openai-green mb-2">{kpi.value}</div>
              <p className="text-gray-600">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
