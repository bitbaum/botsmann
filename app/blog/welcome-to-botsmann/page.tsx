'use client';

import React from 'react';
import Link from 'next/link';

export default function WelcomePost() {
  return (
    <article className="prose prose-gray mx-auto">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight text-gray-900">
        Welcome to Botsmann: AI Solutions for Human Progress
      </h1>

      <p className="mb-4 text-gray-600">
        At Botsmann, we're dedicated to developing cutting-edge AI solutions that help businesses automate tasks,
        enhance productivity, and unlock new possibilities. Our suite of specialized bots and innovative projects
        are designed to transform industries and promote transparency.
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Mission</h2>
      <p className="mb-4 text-gray-600">
        We believe in the power of AI to drive positive change in society. Through our specialized bots and
        ambitious projects, we're working to:
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-600">
        <li>Enhance learning with AI tutors like our Swiss German Teacher</li>
        <li>Support healthcare professionals with our Medical Expert Assistant</li>
        <li>Provide legal guidance through our Legal Expert Assistant</li>
        <li>Foster creativity with our Artistic Advisor</li>
        <li>Promote government transparency with LiberTech</li>
        <li>Revolutionize shopping with Roboshop</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Featured Projects</h2>
      
      <h3 className="mb-2 text-xl font-semibold text-gray-900">LiberTech</h3>
      <p className="mb-4 text-gray-600">
        Our flagship project dedicated to maximizing human liberty and minimizing government power.
        The centerpiece is our Venmo-style government spending tracker, bringing unprecedented
        transparency to public finance.
      </p>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">Roboshop</h3>
      <p className="mb-4 text-gray-600">
        An AI-powered shopping assistant that finds exactly what you need with just one word.
        By integrating with multiple e-commerce platforms and using advanced natural language
        processing, we're simplifying the online shopping experience.
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Get Involved</h2>
      <p className="mb-6 text-gray-600">
        We're always looking for partners, contributors, and early adopters who share our vision.
        Whether you're interested in our specialized bots or want to help promote government
        transparency, we'd love to hear from you.
      </p>

      <div className="mt-8">
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
        >
          Contact Us
        </Link>
      </div>
    </article>
  );
}
