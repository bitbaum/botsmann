import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Logo } from '@/components/shared/Logo';
import { site } from '@/lib/site';
import { ROUTES } from '@/lib/routes';
import bots from '@/data/bots';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white text-sm">
      <div className="mx-auto max-w-screen-xl px-6 py-10 grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <div className="mb-4">
            <Logo size="sm" />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your Private AI Professionals. Expert guidance 24/7.
          </p>
        </div>

        {/* AI Assistants */}
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">AI Assistants</h2>
          <ul className="space-y-2 text-gray-600">
            {bots
              .filter((b) => b.nav)
              .map((bot) => {
                // Extract short category from navDescription (e.g., "AI Legal Assistant" -> "Legal")
                const category =
                  bot.nav!.navDescription?.replace(/^AI\s+/, '').replace(/\s+Assistant$/, '') ||
                  'Assistant';
                return (
                  <li key={bot.slug}>
                    <Link
                      href={`/bots/${bot.slug}`}
                      className="hover:text-action transition-colors"
                    >
                      {bot.nav!.navTitle} ({category})
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Product */}
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Product</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href={ROUTES.PROFESSIONALS} className="hover:text-action transition-colors">
                All Professionals
              </Link>
            </li>
            <li>
              <Link href={ROUTES.MY_DATA} className="hover:text-action transition-colors">
                My Data
              </Link>
            </li>
            <li>
              <Link href={ROUTES.ENTERPRISE} className="hover:text-action transition-colors">
                Enterprise
              </Link>
            </li>
            <li>
              <Link href="/personal" className="hover:text-action transition-colors">
                Personal AI
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Resources</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/knowledge" className="hover:text-action transition-colors">
                Knowledge Base
              </Link>
            </li>
            <li>
              <Link href={ROUTES.BLOG} className="hover:text-action transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-action transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href={ROUTES.CONTACT} className="hover:text-action transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="mb-4 font-semibold text-gray-800">Connect</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-action transition-colors"
              >
                <FaGithub className="text-lg" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-action transition-colors"
              >
                <FaTwitter className="text-lg" /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-gray-400">Your Private AI Professionals</p>
      </div>
    </footer>
  );
}
