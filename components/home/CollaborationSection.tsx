import dynamic from 'next/dynamic';

const ConsultationForm = dynamic(() => import('@/components/ConsultationForm'), {
  loading: () => <div className="text-center">Loading...</div>,
  ssr: false,
});

export default function CollaborationSection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Collaborative Community</h2>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
        We're bringing together engineers and researchers to build the next generation of AI tools.
      </p>
      <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto mb-8 text-left">
        <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <span className="text-2xl mr-2">👩‍💻</span>
            For Engineers
          </h3>
          <p className="text-gray-700">Contribute to cutting-edge AI projects and build scalable solutions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <span className="text-2xl mr-2">🧪</span>
            For Researchers
          </h3>
          <p className="text-gray-700">Apply your domain expertise and collaborate on novel algorithms.</p>
        </div>
      </div>
      <ConsultationForm />
    </section>
  );
}
