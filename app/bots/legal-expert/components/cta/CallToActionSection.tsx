import React from 'react';

interface Props {
  getTryLink: () => string;
}

const CallToActionSection: React.FC<Props> = ({ getTryLink }) => (
  <section className="mt-16 mb-16" id="get-started">
    <div className="rounded-xl bg-gray-50 p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
        Deploy your own private AI legal assistant and keep your data secure.
      </p>
      <div className="flex justify-center gap-4">
        <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity">
          Try Lex Now
        </a>
        <a href="#" className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors">
          Learn More
        </a>
      </div>
    </div>
  </section>
);

export default CallToActionSection;
