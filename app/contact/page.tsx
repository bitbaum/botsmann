import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Botsmann',
  description: 'Questions about Botsmann, or about running it yourself? Write to us.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Have questions about Botsmann, or want to run it on your own servers? Write to us by
          email.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="mb-2 text-lg font-medium text-gray-900">Email</h2>
            <p className="text-gray-600">
              <a href="mailto:cato@orangecat.ch" className="text-action hover:underline">
                cato@orangecat.ch
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-gray-900">Location</h2>
            <p className="text-gray-600">Zurich, Switzerland</p>
          </div>
        </div>
      </div>
    </div>
  );
}
