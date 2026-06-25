import { type FC } from 'react';

/**
 * Privacy & Security section for the homepage
 * Emphasizes Botsmann's privacy-first approach
 */
export const PrivacySection: FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-action" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      iconBg: 'bg-action-tint',
      title: 'End-to-End Encryption',
      description:
        'Your conversations and documents are encrypted in transit and at rest. We cannot read your data.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-action" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      iconBg: 'bg-action-tint',
      title: 'No Data Training',
      description:
        'Your information is never used to train AI models. Your intellectual property stays yours.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-action" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      iconBg: 'bg-action-tint',
      title: 'You Control Your Data',
      description: 'Delete your data anytime. Export everything. No lock-in, no hidden retention.',
    },
  ];

  return (
    <section className="py-20">
      <div className="bg-surface border border-edge rounded-card p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-ink">
            Your Data Stays Yours
          </h2>
          <p className="text-ink-muted max-w-2xl mx-auto text-lg">
            Unlike other AI tools, we built privacy into our foundation. Your conversations are
            confidential, your documents are secure, and you remain in control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="bg-paper rounded-card p-6 border border-edge">
              <div
                className={`w-12 h-12 ${feature.iconBg} rounded-btn flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="font-serif font-semibold text-ink mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
