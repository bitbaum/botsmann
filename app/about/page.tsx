import React from 'react';
import ConsultationForm from '@/components/ConsultationForm';

export default function About() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-6 text-4xl font-semibold tracking-tight">About Botsmann</h1>
      <p className="mb-12 text-lg text-gray-600">
        We specialize in developing cutting-edge AI solutions that help businesses automate tasks,
        enhance productivity, and unlock new possibilities. Our suite of specialized bots is designed
        to tackle specific challenges across various industries.
      </p>
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
        <div className="mx-auto max-w-md">
          <ConsultationForm />
        </div>
      </div>
    </div>
  );
}
