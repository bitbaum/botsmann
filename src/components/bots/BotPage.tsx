'use client';

import React from 'react';
import { NextSection } from '../navigation/NextSection';
import type { BotPageProps, Feature, Step } from '@/types/bot';

function Overview({ content }: { content: string }) {
  return (
    <div className="mb-12">
      <p className="text-lg text-gray-600">{content}</p>
    </div>
  );
}

function Features({ items }: { items: Feature[] }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-semibold">Features</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((feature, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {feature.icon && (
              <div className="mb-4 text-2xl">{feature.icon}</div>
            )}
            <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-semibold">How It Works</h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-openai-green text-xl font-semibold text-white">
                {index + 1}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {step.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={step.image}
                  alt={step.title}
                  className="mt-4 rounded-lg border border-gray-200"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-semibold">Demo</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {children}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="rounded-lg bg-gray-50 p-8 text-center">
      <h2 className="mb-4 text-2xl font-semibold">Ready to Get Started?</h2>
      <p className="mb-6 text-lg text-gray-600">
        Experience the power of AI automation for your specific needs.
      </p>
      <a
        href="/contact"
        className="inline-flex items-center justify-center rounded-md bg-openai-green px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition-opacity"
      >
        Contact Us
      </a>
    </section>
  );
}

export function BotPage({ title, overview, features, howItWorks, demo }: BotPageProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">{title}</h1>
      <Overview content={overview} />
      <Features items={features} />
      <HowItWorks steps={howItWorks} />
      {demo && <Demo>{demo}</Demo>}
      <CTASection />
      <NextSection
        nextPage="/solutions"
        title="Explore Our Enterprise Solutions"
        description="Discover how our enterprise-grade automation solutions can transform your business workflows."
      />
    </div>
  );
}
