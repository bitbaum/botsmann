'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-openai-gray">Botsmann</span>
        </Link>
        <nav className="flex items-center space-x-8">
          <Link href="/bots" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            Bots
          </Link>
          <Link href="/libertech" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            LiberTech
          </Link>
          <Link href="/roboshop" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            Roboshop
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            About
          </Link>
          <Link 
            href="/about" 
            className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
