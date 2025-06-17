import React from 'react';
import { NextSection } from '@/src/components/navigation/NextSection';

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">How Botsmann Works</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Platform Overview</h2>
        <p className="mb-6 text-lg text-gray-600">
          Botsmann is a platform for creating, showcasing, and managing AI bots built with the OpenAI API. Each bot provides specialized functionality through a custom web interface that connects to a ChatGPT-powered backend.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Transparency and Automation</h2>
        <p className="mb-6 text-lg text-gray-600">
          We believe in the transformative power of transparency and automation. Our projects are driven by three core principles: making processes transparent, automating redundant tasks, and empowering individuals through technology. By building in public, financing in public, and transacting in public, we create systems that are accountable and trustworthy.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Mission</h2>
        <p className="mb-6 text-lg text-gray-600">
          At Botsmann, we are committed to methodically automating redundant, intransparent, and labor-intensive processes. Our mission is to free people from unpleasant tasks, giving them back their most precious resource: time and freedom to focus on what truly matters.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-medium">Approach</h2>
        <p className="text-lg text-gray-600">
          Through innovative AI solutions and automation technologies, we transform complex, time-consuming workflows into efficient, transparent processes. Our commitment to transparency ensures that every automated decision is traceable and understandable, building trust between humans and AI systems.
        </p>
      </section>

      <NextSection
        nextPage="/solutions"
        title="Explore Our Solutions"
        description="Discover how our AI tools can transform your workflows."
      />
    </div>
  );
}
