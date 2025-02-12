import React from 'react';
import ConsultationForm from '@/components/ConsultationForm';
import { NextSection } from '@/src/components/navigation/NextSection';

export default function About() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-6 text-4xl font-semibold tracking-tight">About Botsmann</h1>
      <p className="mb-6 text-lg text-gray-600">
        At Botsmann, we are committed to methodically automating redundant, intransparent, and 
        labor-intensive processes. Our mission is to free people from unpleasant tasks, giving 
        them back their most precious resource: time and freedom to focus on what truly matters.
      </p>
      <p className="mb-12 text-lg text-gray-600">
        Through innovative AI solutions and automation technologies, we transform complex, 
        time-consuming workflows into efficient, transparent processes. Our commitment extends 
        beyond mere automation – we strive to create a future where technology serves human 
        potential, enabling everyone to pursue meaningful endeavors.
      </p>
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
        <div className="mx-auto max-w-md">
          <ConsultationForm />
        </div>
      </div>

      <NextSection
        nextPage="/solutions"
        title="Explore Our Solutions"
        description="Discover how our AI-powered solutions can help automate your workflows and transform your business."
      />
    </div>
  );
}
