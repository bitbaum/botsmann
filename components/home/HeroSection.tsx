import Link from 'next/link';
import { FaShieldAlt, FaClock, FaBrain } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="text-center py-20 bg-gradient-to-br from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">AI Extensions of Your Mind</h1>
      <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
        We build AI extensions that maximize computational power, privacy, sovereignty and efficiency.
      </p>
      <div className="flex justify-center gap-8 mb-8 flex-wrap">
        <div className="flex items-center space-x-2">
          <FaShieldAlt className="text-openai-green w-5 h-5" />
          <span className="text-sm text-gray-700">Private by default</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaBrain className="text-openai-green w-5 h-5" />
          <span className="text-sm text-gray-700">Open-source models</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="text-openai-green w-5 h-5" />
          <span className="text-sm text-gray-700">Save time</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/bots" className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity">
          Explore Our Bots
        </Link>
        <Link href="/about" className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors">
          Learn More
        </Link>
      </div>
    </section>
  );
}
