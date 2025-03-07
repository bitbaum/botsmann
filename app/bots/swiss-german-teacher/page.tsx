'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import bots from '../../../data/bots';

export default function SwissGermanTeacher() {
  const bot = bots.find(b => b.slug === 'swiss-german-teacher');
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    events: false,
    newsletters: false,
    blog: false,
    videos: false
  });
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked
    });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit to waitlist');
      }
      
      // Success
      setWaitlistSubmitted(true);
      setEmail('');
      setPreferences({
        events: false,
        newsletters: false,
        blog: false,
        videos: false
      });
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setFormError('Failed to submit. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">{bot.title}</h1>
          <p className="mb-8 text-lg text-gray-600">{bot.description}</p>
          <div className="flex justify-center gap-4">
            {bot.tryLink && (
              <a
                href={bot.tryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Try Heidi Now
              </a>
            )}
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">Why Heidi Stands Out</h2>
          <p className="mb-8 text-center text-lg text-gray-600">{bot.overview}</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bot.features.map((feature, index) => {
              const [title, description] = feature.split(': ');
              return (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">How Heidi Helps You Shine</h2>
          <p className="mb-8 text-center text-lg text-gray-600">From a single word to a full email, she's got your back.</p>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-gray-600">{bot.details}</p>
            {bot.tryLink && (
              <a
                href={bot.tryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Test Heidi Now
              </a>
            )}
          </div>
        </div>

        {/* Example Output Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">Heidi in Action</h2>
          <p className="mb-8 text-center text-lg text-gray-600">Try Heidi right here—see what she can do!</p>
          
          {/* Add input field and redirection button */}
          <div className="mb-8 mx-auto max-w-3xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Try a word like 'dog' or an email request..."
                className="flex-grow border border-gray-300 rounded-md p-2 text-gray-800"
                value={inputValue}
                onChange={handleInputChange}
              />
              {bot.tryLink && (
                <a
                  href={`${bot.tryLink}${inputValue ? '?input=' + encodeURIComponent(inputValue) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                >
                  Try It
                </a>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Input redirects to ChatGPT for responses.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Input: "dog"</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">d'Iigabä</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">d'Bedütig</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Es Satz uf Hochdütsch</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Es Satz uf Züridütsch</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">de Hund, -</td>
                      <td className="px-4 py-3 text-sm text-gray-500">CH: de Hund DE: der Hund Es Tier mit…</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Der Hund bellt laut.</td>
                      <td className="px-4 py-3 text-sm text-gray-500">De Hund böllt luut.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Input: "Can you draft an email for me?"</h3>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900">Hochdeutsch:</h4>
                <p className="text-sm text-gray-600">"Betreff: Ihre Anfrage – Sehr geehrte Frau Müller…"</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">Züridütsch Note:</h4>
                <p className="text-sm text-gray-600">"Wöu du öppis änders wöu, säg mir Bescheid!"</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            {bot.tryLink && (
              <a
                href={bot.tryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Try It Yourself
              </a>
            )}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">Ready to Experience Heidi?</h2>
          <p className="mb-8 text-center text-lg text-gray-600">Start mastering Swiss German and living like a local today.</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex flex-col items-center">
              {bot.tryLink && (
                <a
                  href={bot.tryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                >
                  Try Heidi Now
                </a>
              )}
            </div>
            
            <div className="md:border-l md:pl-8 md:border-gray-300">
              <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Join the Waitlist</h3>
              {waitlistSubmitted ? (
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-800">Thanks for joining our waitlist! We'll keep you updated on Heidi's upcoming features.</p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="your@email.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div>
                    <p className="block text-sm font-medium text-gray-700">I'm interested in (optional):</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="events"
                          name="events"
                          className="h-4 w-4 text-openai-green"
                          checked={preferences.events}
                          onChange={handlePreferenceChange}
                        />
                        <label htmlFor="events" className="ml-2 text-sm text-gray-700">
                          Events
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletters"
                          name="newsletters"
                          className="h-4 w-4 text-openai-green"
                          checked={preferences.newsletters}
                          onChange={handlePreferenceChange}
                        />
                        <label htmlFor="newsletters" className="ml-2 text-sm text-gray-700">
                          Newsletters
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="blog"
                          name="blog"
                          className="h-4 w-4 text-openai-green"
                          checked={preferences.blog}
                          onChange={handlePreferenceChange}
                        />
                        <label htmlFor="blog" className="ml-2 text-sm text-gray-700">
                          Blog Updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="videos"
                          name="videos"
                          className="h-4 w-4 text-openai-green"
                          checked={preferences.videos}
                          onChange={handlePreferenceChange}
                        />
                        <label htmlFor="videos" className="ml-2 text-sm text-gray-700">
                          Videos/Audio
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 
                      ${submitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} 
                      text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {submitting ? 'Submitting...' : 'Join Waitlist'}
                  </button>
                  
                  {formError && (
                    <p className="mt-2 text-sm text-red-600">{formError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Future Vision & Contributors Section */}
        <div className="py-12 text-center bg-gray-50 rounded-2xl my-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Next for Heidi?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Heidi's just getting started! We're building her to be the ultimate companion for immigrants settling into Switzerland, making it easier to connect with local communities and embrace Swiss dialects. Here's what's coming:
          </p>
          <ul className="list-disc text-left max-w-xl mx-auto mb-8 text-gray-700 px-8">
            <li className="mb-2">Personalized learning paths tailored to your Swiss German goals.</li>
            <li className="mb-2">Zurich event suggestions to dive into local culture.</li>
            <li className="mb-2">Daily blogs, videos, and audios in Züridütsch to immerse you in the language.</li>
            <li className="mb-2">Custom communication—Heidi chats with you based on your needs.</li>
          </ul>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our mission? To help immigrants integrate and grow the number of Swiss dialect speakers. Unlike Germany's uniform Hochdeutsch, Switzerland's local dialects are a beautiful part of its identity—and we want to keep it that way.
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Love this vision? Join us! We need Swiss German experts and software engineers, but welcome anyone passionate about this project. Get in touch to shape Heidi's future with us!
          </p>
          <a 
            href="mailto:contribute@botsmann.com" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block hover:bg-blue-700"
          >
            Join the Heidi Community
          </a>
        </div>
      </main>
    </div>
  );
}
