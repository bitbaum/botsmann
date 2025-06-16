import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kigott. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-brand-500">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-brand-500">
              Terms
            </a>
            <a href="/contact" className="text-sm text-gray-500 hover:text-brand-500">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
