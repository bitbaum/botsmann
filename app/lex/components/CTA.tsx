import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-16 bg-gray-50 text-center" id="cta">
      <h2 className="mb-4 text-3xl font-semibold text-gray-900">Ready to deploy your private AI lawyer?</h2>
      <p className="mb-6 text-gray-700">Choose your setup and start today.</p>
      <Link href="/contact" className="btn-primary">Book Demo</Link>
    </section>
  );
}
