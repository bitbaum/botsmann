import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-16 text-center" id="hero">
      <h1 className="mb-4 text-5xl font-bold text-gray-900">Your AI Legal Partner—On Your Terms</h1>
      <p className="mb-8 text-lg text-gray-700">Lex turns complex law into clear answers, privately and instantly.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="#comparison" className="btn-primary">Get Started</Link>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="btn-secondary">Watch Demo</Link>
      </div>
    </section>
  );
}
