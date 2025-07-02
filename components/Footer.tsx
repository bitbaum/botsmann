import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white text-sm">
      <div className="mx-auto max-w-screen-xl px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Company</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-openai-green">
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-openai-green">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-openai-green">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Legal</h2>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:text-openai-green">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-openai-green">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Follow Us</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/botsmann"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-openai-green"
              >
                <FaGithub /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/botsmann"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-openai-green"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-gray-500">
        © {new Date().getFullYear()} Botsmann. All rights reserved.
      </div>
    </footer>
  );
}
