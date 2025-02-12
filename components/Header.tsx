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
          <div className="relative group">
            <button className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
              Bots
            </button>
            <div className="absolute left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 py-2 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <Link href="/bots/artistic-advisor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Artistic Advisor
              </Link>
              <Link href="/bots/auto-shopper" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Auto Shopper
              </Link>
              <Link href="/bots/gov-spending-tracker" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Gov Spending Tracker
              </Link>
              <Link href="/bots/legal-expert" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Legal Expert
              </Link>
              <Link href="/bots/medical-expert" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Medical Expert
              </Link>
              <Link href="/bots/swiss-german-teacher" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Swiss German Teacher
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
              Projects
            </button>
            <div className="absolute left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 py-2 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <Link href="/projects/libertech/gov-spending" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Gov Spending
              </Link>
              <Link href="/projects/roboshop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Roboshop
              </Link>
            </div>
          </div>
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
