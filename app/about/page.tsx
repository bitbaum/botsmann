import React from 'react';
import ConsultationForm from '@/components/ConsultationForm';
import { NextSection } from '@/src/components/navigation/NextSection';

export default function About() {
  return (
    <div className="mx-auto max-w-prose px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">About Kigott</h1>
      
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Philosophy</h2>
        <p className="mb-6 text-lg text-gray-600">
          We believe in the transformative power of transparency and automation. Our projects are driven by 
          three core principles: making processes transparent, automating redundant tasks, and empowering 
          individuals through technology. By building in public, financing in public, and transacting in 
          public, we create systems that are accountable and trustworthy.
        </p>
        <p className="mb-6 text-lg text-gray-600">
          Our commitment to transparency extends beyond just making data visible – we believe in making 
          every process, decision, and transaction fully understandable and accessible. This philosophy 
          drives our project development, from government spending tracking to transparent project finance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Mission</h2>
        <p className="mb-6 text-lg text-gray-600">
          At Kigott, we are committed to methodically automating redundant, intransparent, and 
          labor-intensive processes. Our mission is to free people from unpleasant tasks, giving 
          them back their most precious resource: time and freedom to focus on what truly matters.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Our Approach</h2>
        <p className="mb-6 text-lg text-gray-600">
          Through innovative AI solutions and automation technologies, we transform complex, 
          time-consuming workflows into efficient, transparent processes. Our commitment to 
          transparency ensures that every automated decision is traceable and understandable, 
          building trust between humans and AI systems.
        </p>
      </section>
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
