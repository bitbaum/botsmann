'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'LiberTech',
    description: 'Technologies dedicated to maximizing human liberty and minimizing government power. Featuring innovative solutions like the Venmo-style government spending tracker.',
    href: '/projects/libertech',
    image: '/libertech.png'
  },
  {
    title: 'Roboshop',
    description: 'AI-powered shopping assistant that finds exactly what you need with just one word. Integrating with multiple e-commerce platforms for the best results.',
    href: '/projects/roboshop',
    image: '/roboshop.png'
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our ambitious projects aimed at transforming society through technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video w-full bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl font-medium text-gray-900">{project.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-openai-green">
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
