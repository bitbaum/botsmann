'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Local environment detection
  const isLocalEnvironment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Get the tryLink - now always points to the real bot
  const getTryLink = () => {
    if (!bot?.tryLink) return '#';
    return bot.tryLink;
  };

  // Demo mode handling
  const [demoMode, setDemoMode] = useState(false);
  const [demoResponse, setDemoResponse] = useState<string | null>(null);
  const [demoResponseType, setDemoResponseType] = useState<'cat' | 'other'>('other');

  // Simulated response for the word "cat"
  const catResponse = {
    word: "d'Chatz, -e",
    meaning: "CH: d'Chatz DE: die Katze",
    highGermanSentence: "Die Katze miaut laut.",
    swissGermanSentence: "D'Chatz miaut luut."
  };

  // Detailed Chatz popup data
  const chatzTableData = [
    { term: "d'Chatz, -e", meaning: "CH: d'Chatz, -e DE: die Katze – Es Tier mit weichem Fell.", highGerman: "Die Katze schläft auf dem Sofa.", swissGerman: "D'Chatz schlaft uf em Sofa." },
    { term: "de Büsi, -", meaning: "CH: de Büsi, - DE: das Kätzchen – Es chliis Chatzli.", highGerman: "Das Kätzchen spielt mit Wolle.", swissGerman: "De Büsi spielt mit Wöu." },
    { term: "de Kater, -", meaning: "CH: de Kater, - DE: der Kater – Es männliche Chätzli.", highGerman: "Der Kater jagt eine Maus.", swissGerman: "De Kater jagt e Muus." },
    { term: "s'Chätzli, -", meaning: "CH: s'Chätzli, - DE: das Kätzchen – E jungi Chatz.", highGerman: "Das Kätzchen schnurrt laut.", swissGerman: "S'Chätzli schnurrt luut." },
    { term: "d'Hauschatz, -e", meaning: "CH: d'Hauschatz, -e DE: die Hauskatze – E Chatz im Huus.", highGerman: "Die Hauskatze liegt im Bett.", swissGerman: "D'Hauschatz ligt im Bett." },
    { term: "d'Wildchatz, -e", meaning: "CH: d'Wildchatz, -e DE: die Wildkatze – E wildi Chatz.", highGerman: "Wildkatzen leben im Wald.", swissGerman: "Wildchätz lebed im Wald." },
    { term: "d'Schmusechatz, -e", meaning: "CH: d'Schmusechatz, -e DE: die Schmusekatze – E kuschelndi Chatz.", highGerman: "Die Schmusekatze mag Streicheln.", swissGerman: "D'Schmusechatz mag Streichle." },
    { term: "de Stubetiger, -", meaning: "CH: de Stubetiger, - DE: der Stubentiger – En andere Begriff für e Huuschatz.", highGerman: "Der Stubentiger ruht sich aus.", swissGerman: "De Stubetiger ruht sich us." },
    { term: "d'Mieze, -e", meaning: "CH: d'Mieze, -e DE: die Mieze – E liebi Chatz.", highGerman: "Die Mieze versteckt sich gern.", swissGerman: "D'Mieze versteckt sich gärn." },
    { term: "de Fellchnäuel, -", meaning: "CH: de Fellchnäuel, - DE: der Fellknäuel – E Chatz mit Fell.", highGerman: "Der Fellknäuel rollt sich ein.", swissGerman: "De Fellchnäuel röuet sich i." }
  ];

  // Züridütsch reply for popup
  const zuridutschReply = [
    "Hey, mini Chatz isch e Schmusechatz! 🐱",
    "Sie ligt gärn uf em Sofa und schnurrt.",
    "Hüt isch es Event i Züri – s'Katzefestival am See.",
    "Ich nimm de Büsi mit, gudd?",
    "Schrib mir, wenn'd lust hesch mitcho!"
  ];

  // Check for demo mode on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('demo') === 'true') {
        setDemoMode(true);
      }
      const input = urlParams.get('input');
      if (input) {
        setInputValue(input);
        
        // Generate appropriate response based on input
        if (input.toLowerCase() === 'cat' || input.toLowerCase() === 'chatz') {
          setDemoResponseType('cat');
          setDemoResponse(JSON.stringify(catResponse));
        } else {
          setDemoResponseType('other');
          setDemoResponse(`Demo response for: "${input}"`);
        }
      }
    }
    
    // Handle clicks outside of popup
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false);
      }
    }
    
    // Add event listener for outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate demo response based on input
  const generateDemoResponse = () => {
    if (inputValue.toLowerCase() === 'cat' || inputValue.toLowerCase() === 'chatz') {
      setDemoResponseType('cat');
      setDemoResponse(JSON.stringify(catResponse));
    } else {
      setDemoResponseType('other');
      setDemoResponse(`Demo response for: "${inputValue}"`);
    }
  };

  // Toggle feature selection
  const toggleFeature = (index: number) => {
    if (selectedFeature === index) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(index);
    }
  };

  // Toggle popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Form handlers
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

  if (!bot) {
    return <div>Bot not found</div>;
  }

  // CSS class helpers
  const btnPrimary = "inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors";
  const btnSecondary = "inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors";
  const cardStyle = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm";

  // Detailed explanations for each feature
  const featureExplanations = [
    "Our system analyzes your learning style and presents information in the format that works best for you. Whether you prefer visual aids, audio examples, or written explanations, Heidi adapts to your needs to maximize your learning efficiency.",
    "Learn both High German (Hochdeutsch) and Swiss German (Züridütsch) side by side with clear comparisons highlighting the key differences. This dual-language approach helps you understand the formal language used in writing while also mastering the dialectal forms essential for everyday conversation.",
    "Every word and phrase comes with authentic examples showing how locals actually use the language in different contexts. This context-rich approach helps you understand nuance and connotation beyond simple translation.",
    "Need to write a formal email? A casual text message? Heidi helps you craft communications in both High German and Swiss German, ensuring you have the right tone and formality level for every situation.",
    "Beyond just language, Heidi provides cultural insights on Swiss customs, etiquette, and historical context. Understanding these cultural nuances will help you integrate more smoothly into Swiss society.",
    "From navigating public transport to understanding local government systems, Heidi offers practical knowledge to help you navigate everyday life in Switzerland with confidence."
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 text-center">
            Heidi – Master Swiss German with Precision
          </h1>
          <p className="mb-8 text-lg text-gray-600 text-center">
            The only AI tool designed to teach Swiss German through context and expertise. Start now.
          </p>
          <div className="flex justify-center gap-4">
            <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Try Heidi Now
            </a>
            <Link href="#features" className={btnSecondary}>
              Learn More
            </Link>
          </div>
        </div>

        {/* What Heidi Offers Section */}
        <div id="features" className="mb-16 mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">What Heidi Offers</h2>
          <p className="mb-8 text-lg text-gray-600 text-center">
            Advanced language learning, built with science in mind for Switzerland's newcomers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start`}>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Teaching</h3>
              <p className="text-gray-600">Words and phrases are shown in context for rapid retention.</p>
            </div>
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start`}>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Texting</h3>
              <p className="text-gray-600">Authentic Swiss German replies for real conversations.</p>
            </div>
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start`}>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Emails</h3>
              <p className="text-gray-600">Professional email drafts and responses, crafted instantly.</p>
            </div>
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start`}>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Events</h3>
              <p className="text-gray-600">Zürich events this week to get to know your city better.</p>
            </div>
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start`}>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-openai-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Tips</h3>
              <p className="text-gray-600">Expert and fun insights for thriving in Switzerland.</p>
            </div>
            <div className={`${cardStyle} hover:shadow-md transition-shadow duration-300 flex flex-col items-start relative`}>
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                Coming Soon
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Adapts to You</h3>
              <p className="text-gray-600">Tables for words, replies for sentences—built for your needs.</p>
              <div className="mt-3 text-sm text-blue-600">
                Our adaptive learning feature is in development.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Test Heidi Now
            </a>
          </div>
        </div>

        {/* Heidi in Action Section */}
        <div className="mb-16 mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">Heidi in Action</h2>
          <p className="mb-8 text-lg text-gray-600 text-center">
            See Heidi's contextual learning in practice—try "cat" now.
          </p>
          <div className={cardStyle}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Try a word like 'cat' or a message..."
                className="flex-1 border border-gray-300 rounded-md p-2"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                onClick={() => inputValue.toLowerCase() === 'cat' && togglePopup()}
                className={btnPrimary}
              >
                Try It
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">See Heidi's response in a popup.</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Example: "cat"</h3>
                <p className="text-gray-600">Heidi provides a complete table of Swiss German terms, meanings, and example sentences.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Example: "How's Zürich treating you?"</h3>
                <p className="text-gray-600">"Hoi, Zürich isch super! Wie gehd's dir do?"</p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Try Heidi Now
              </a>
            </div>
          </div>
        </div>

        {/* Why Heidi Stands Out Section */}
        <div className="mb-16 mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">Why Heidi Stands Out</h2>
          <p className="mb-8 text-lg text-gray-600 text-center">Smart, simple tools to speak and live like a local.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Dual-Language Power: High German and Züridütsch, side by side.",
              "Real Context: Words and phrases come alive with examples.",
              "Instant Writing: Emails and texts crafted in both languages.",
              "Swiss Life: Insider tips on culture and practical know-how.",
              "Events: Zürich events to connect and practice.",
              "Adapts to You: Tables for words, replies for sentences—built for your needs."
            ].map((feature, index) => {
              const [title, description] = feature.split(': ');
              const isSelected = selectedFeature === index;
              const isAdapts = title === "Adapts to You";
              return (
                <div
                  key={index}
                  className={`${cardStyle} h-full flex flex-col transition-all duration-300 ${isSelected ? 'ring-2 ring-openai-green shadow-md' : 'hover:shadow-md cursor-pointer'} ${isAdapts ? 'relative' : ''}`}
                  onClick={() => toggleFeature(index)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isSelected}
                >
                  {isAdapts && (
                    <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                      Coming Soon
                    </div>
                  )}
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600 flex-1">{description}</p>
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                      <p className="text-gray-700">
                        {title === "Dual-Language Power" && featureExplanations[1]}
                        {title === "Real Context" && featureExplanations[2]}
                        {title === "Instant Writing" && featureExplanations[3]}
                        {title === "Swiss Life" && "From understanding Swiss customs to navigating daily life—like public transport or local norms—Heidi equips you with the knowledge to integrate seamlessly into Switzerland."}
                        {title === "Events" && "Heidi suggests weekly Zürich events where you can use your Swiss German, meet people, and build connections—making integration easier and more social."}
                        {title === "Adapts to You" && "Our upcoming adaptive learning feature will suggest content and events based on your interests and learning style. It will tailor tables for words and personalized replies for sentences, all built specifically for your learning needs."}
                      </p>
                      {isAdapts && (
                        <p className="mt-2 text-sm text-blue-600">This feature is currently in development.</p>
                      )}
                      <button
                        className="mt-3 text-sm text-openai-green hover:underline"
                        onClick={(e) => { e.stopPropagation(); setSelectedFeature(null); }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ready to Learn with Heidi? Section */}
        <div className="mb-16 mx-auto max-w-3xl">
          <div className={cardStyle}>
            <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">Ready to Learn with Heidi?</h2>
            <p className="mb-8 text-lg text-gray-600 text-center">Accelerate your Swiss German fluency today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
              <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Try Heidi Now
              </a>
              <button onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })} className={btnPrimary}>
                Join Waitlist
              </button>
            </div>
            <div id="waitlist-form" className="max-w-md mx-auto">
              {waitlistSubmitted ? (
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-800">Thanks for joining our waitlist! We'll keep you updated on Heidi's upcoming features.</p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                    <p className="block text-sm font-medium text-gray-700">Interests (optional):</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(['events', 'newsletters', 'blog', 'videos'] as const).map((key) => (
                        <div key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            id={key}
                            name={key}
                            className="h-4 w-4 text-openai-green"
                            checked={preferences[key]}
                            onChange={handlePreferenceChange}
                          />
                          <label htmlFor={key} className="ml-2 text-sm text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full ${btnPrimary} ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? 'Submitting...' : 'Join Waitlist'}
                  </button>
                  {formError && <p className="mt-2 text-sm text-red-600">{formError}</p>}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Future Vision & Contributors Section */}
        <div className="py-12 bg-gray-50 rounded-xl my-16 max-w-3xl mx-auto">
          <div className="px-6">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">
              Heidi's Big Leap: Your Swiss Life Revolution Starts Here
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Heidi's evolving fast—from a language ace to your all-in-one guide for thriving in Switzerland. We're crafting a game-changer to connect immigrants with Swiss culture, communities, and dialects like never before. Here's the exciting future we're building:
            </p>
            <ul className="list-disc pl-5 mb-8 text-gray-700">
              <li className="mb-2"><strong>Personalized Journeys:</strong> Tailored paths to master Swiss German and fit right in.</li>
              <li className="mb-2"><strong>Zürich Insider:</strong> Event picks to dive into local life and make real connections.</li>
              <li className="mb-2"><strong>Daily Immersion:</strong> Züridütsch blogs, videos, and audio to live the language.</li>
              <li className="mb-2"><strong>Your Swiss Voice:</strong> Smart chats that adapt to your integration needs.</li>
            </ul>
            <p className="mb-8 text-lg text-gray-600">
              Our dream? To empower newcomers to live Swiss life fully—and keep Switzerland's vibrant dialects thriving. Forget Germany's one-size-fits-all Hochdeutsch—Switzerland's cultural heartbeat is in its dialects, and we're here to amplify it.
            </p>
            <p className="mb-8 text-lg text-gray-600 font-semibold">
              Be Part of the Movement!
            </p>
            <p className="mb-8 text-lg text-gray-600">
              This is your chance to shape Heidi's next chapter. We're calling on Swiss German wizards, tech innovators, and culture enthusiasts to join us. Ready to make an impact? Get in touch now—let's build Switzerland's integration future together!
            </p>
            <div className="text-center">
              <a href="mailto:contribute@botsmann.com" className={btnPrimary}>
                Join the Heidi Revolution
              </a>
            </div>
          </div>
        </div>

        {/* Explore Other Solutions Section */}
        <div className="pb-16 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <div className="border-t border-gray-200 pt-10">
              <p className="text-lg text-gray-600 mb-4">
                Heidi is just one of many specialized solutions we offer at Botsmann.
              </p>
              <Link href="/solutions" className={`${btnPrimary} inline-flex items-center`}>
                <span>Explore Our Other Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chatz Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && togglePopup()}
        >
          <div
            ref={popupRef}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
          >
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="Close popup"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Heidi's Output</h3>
            <p className="text-gray-600 mb-2">Iigabä: Chatz</p>
            <p className="text-gray-600 mb-4">Iigabetyp: Es Wort (es Nomen, Englisch) – Contextual learning aid</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">d'Iigabä</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">d'Bedütig</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Es Satz uf Hochdütsch</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Es Satz uf Züridütsch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chatzTableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-gray-600">{row.term}</td>
                      <td className="px-3 py-2 text-gray-600">{row.meaning}</td>
                      <td className="px-3 py-2 text-gray-600">{row.highGerman}</td>
                      <td className="px-3 py-2 text-gray-600">{row.swissGerman}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Züridütsch Text</h4>
              <p className="text-gray-600">
                Mini Chatz isch e Schmusechatz und schnurrt jede Nacht uf em Sofa. Sie jagt gärn de Büsi im Garte, wo all d'Chätzli spiled. Hüt ha i e Text gschickt, dass i sie mit ans Zürcher Katzefäscht nimm—sie isch echt e Stubetiger!
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">Try more Swiss German words and phrases with Heidi!</p>
              <a 
                href={getTryLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={btnPrimary}
              >
                Continue with Heidi
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Demo Mode Section - Only shown in local development when demo=true */}
      {demoMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Heidi Demo Mode</h2>
            {demoResponse ? (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Your Input: "{inputValue}"</h3>
                {demoResponseType === 'cat' ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">d'Iigabä</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">d'Bedütig</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hochdütsch</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Züridütsch</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-3 py-2 text-sm text-gray-500">d'Chatz, -e</td>
                            <td className="px-3 py-2 text-sm text-gray-500">CH: d'Chatz DE: die Katze</td>
                            <td className="px-3 py-2 text-sm text-gray-500">Die Katze miaut laut.</td>
                            <td className="px-3 py-2 text-sm text-gray-500">D'Chatz miaut luut.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">This is a simulated response for local development.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>{demoResponse}</p>
                    <p className="mt-4 text-sm text-gray-500">This is a simulated response for local development.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <p>Enter a word or phrase to see how Heidi would respond.</p>
                <p className="text-sm text-gray-500 mt-2">Try the word "cat" to see a special formatted response!</p>
                <div className="mt-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Try 'cat' or any other word"
                    className="flex-grow border border-gray-300 rounded-md p-2"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-openai-green text-white px-4 py-2 rounded-md"
                    onClick={generateDemoResponse}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setDemoMode(false);
                  window.history.pushState({}, '', '/bots/swiss-german-teacher');
                }}
              >
                Close Demo
              </button>
              {demoResponse && (
                <button
                  className="text-openai-green hover:underline"
                  onClick={() => {
                    setDemoResponse(null);
                  }}
                >
                  Try Another Word
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// This is a comment to demonstrate GitHub deployment workflow
