import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">Botsmann</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Navigation />
        </div>
      </div>
    </header>
  );
}