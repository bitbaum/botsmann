'use client';

import React from 'react';
import Link from 'next/link';
import bots from '../../../data/bots';

export default function MedicalExpert() {
  const bot = bots.find(b => b.slug === 'medical-expert');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Title and Overview */}
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">{bot.title}</h1>
          
          {/* Medical Disclaimer */}
          <div className="mb-8 rounded-xl bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-medium text-red-800">Medical Disclaimer</h3>
                <p className="text-red-700 text-sm mt-1">
                  The Medical Expert provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment.
                  Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
          </div>
          
          <p className="mb-8 text-lg text-gray-600">{bot.overview}</p>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Features</h2>
            <ul className="space-y-4">
              {bot.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="mr-3 h-5 w-5 flex-shrink-0 text-openai-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ask a health question</h3>
                  <p className="text-gray-600">Enter your health-related question or concern.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Analysis</h3>
                  <p className="text-gray-600">Our AI processes your question using medical knowledge and trusted sources.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-openai-green text-white">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Get Information</h3>
                  <p className="text-gray-600">Receive evidence-based information to better understand health topics.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Health Information Assistant</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-gray-600">Ask a health question or learn about medical conditions.</p>
            
            <div className="mb-6">
              <input 
                type="text" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-openai-green focus:ring-openai-green p-3"
                placeholder="Example: What are the symptoms of type 2 diabetes?"
              />
            </div>
            
            <div className="flex justify-center">
              <button className="rounded-md bg-openai-green px-6 py-3 text-white hover:bg-opacity-90 transition-opacity">
                Get Health Information
              </button>
            </div>
          </div>
        </section>
        
        {/* Health Topics Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Explore Health Topics</h2>
          
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[
              "Nutrition", "Exercise", "Mental Health", "Sleep", 
              "Heart Health", "Diabetes", "Allergies", "Prevention"
            ].map((topic, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-gray-800">{topic}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Example Q&A Section */}
        <section className="mt-16 mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">Common Health Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How much water should I drink daily?",
                answer: "While the '8 glasses a day' rule is popular, individual water needs vary based on activity level, climate, and overall health. Most healthy adults need about 3.7 liters (men) or 2.7 liters (women) of fluids daily from all sources, including water, other beverages, and food."
              },
              {
                question: "What's the difference between a cold and the flu?",
                answer: "Both are respiratory illnesses, but they're caused by different viruses. Colds generally develop gradually with symptoms like runny nose and congestion. The flu often starts suddenly with more severe symptoms including fever, body aches, and extreme fatigue. The flu is more likely to lead to serious complications."
              },
              {
                question: "How can I improve my sleep quality?",
                answer: "Establish a regular sleep schedule, create a restful environment, limit daytime naps, include physical activity in your daily routine, manage stress, and avoid caffeine, nicotine, and alcohol before bedtime. If sleep problems persist, consult a healthcare provider."
              }
            ].map((item, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-medium text-gray-900">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 mb-16">
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore health topics and get evidence-based information with our AI-powered medical assistant.
            </p>
            <div className="flex justify-center gap-4">
              <button className="rounded-md bg-openai-green px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90 transition-opacity">
                Try {bot.title} Now
              </button>
              <button className="rounded-md border-2 border-openai-green px-6 py-3 text-lg font-medium text-openai-green hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
