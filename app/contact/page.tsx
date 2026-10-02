import { type Metadata } from 'next';
import { ConsultationFormLoader } from '@/components/ConsultationFormLoader';

export const metadata: Metadata = {
  title: 'Contact | Botsmann',
  description: 'Questions about Botsmann, or a deployment for your team? Write to us.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Have questions about Botsmann, or want it running for your team? Send a message with the
          form below or write to us directly.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Get in Touch</h2>

          <div className="mb-8 space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:cato@orangecat.ch" className="text-action hover:underline">
                  cato@orangecat.ch
                </a>
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">Location</h3>
              <p className="text-gray-600">Zurich, Switzerland</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Request a Consultation</h2>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <ConsultationFormLoader />
          </div>
        </div>
      </div>
    </div>
  );
}
