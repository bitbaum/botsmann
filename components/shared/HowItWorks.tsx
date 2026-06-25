import { type FC } from 'react';

/**
 * How It Works section for the homepage
 * Visual step-by-step explanation of using AI Professionals
 */
export const HowItWorks: FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose Your Professional',
      description:
        'Select the AI advisor that matches your needs — legal, health, research, language, creative, or business.',
    },
    {
      number: 2,
      title: 'Ask Your Question',
      description:
        'Chat naturally or upload documents for context. Get expert-level guidance tailored to your situation.',
    },
    {
      number: 3,
      title: 'Get Expert Guidance',
      description:
        'Receive clear, actionable insights instantly. Personalise with your documents for even better results.',
    },
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl font-semibold mb-4 text-ink">How It Works</h2>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto">
          Get expert guidance in three simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-14 h-14 bg-action-tint border border-action/20 rounded-card flex items-center justify-center text-action font-serif text-2xl font-semibold mx-auto mb-6">
              {step.number}
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink mb-3">{step.title}</h3>
            <p className="text-ink-muted leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Visual connector line (hidden on mobile) */}
      <div className="hidden md:block max-w-3xl mx-auto mt-[-160px] mb-[100px]">
        <div className="flex justify-between px-8">
          <div className="w-1/3 flex justify-end pr-8">
            <div className="w-full h-px bg-edge mt-[1.6rem]" />
          </div>
          <div className="w-1/3 flex justify-start pl-8">
            <div className="w-full h-px bg-edge mt-[1.6rem]" />
          </div>
        </div>
      </div>
    </section>
  );
};
