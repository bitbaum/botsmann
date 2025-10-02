'use client';

import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      username: '@LegalEagle_CH',
      title: 'Partner, International Law Firm',
      location: 'Zurich, Switzerland',
      quote: 'The team behind Lex is doing something extraordinary. Their combination of deep legal understanding and cutting-edge AI expertise is exactly what the legal industry needs. I\'m excited to see where this goes.',
      avatar: '🦅',
      expertise: 'Corporate Law',
      profileUrl: '#'
    },
    {
      username: '@TechLawProf',
      title: 'Professor of Legal Tech',
      location: 'University of St. Gallen',
      quote: 'I\'ve reviewed their technical approach and vision for AI-assisted legal work. The methodology is sound, the team is dedicated, and the potential impact is significant. This could transform how legal professionals work.',
      avatar: '🎓',
      expertise: 'Legal Technology',
      profileUrl: '#'
    },
    {
      username: '@DataRoomQueen',
      title: 'Legal Counsel, Tech Startup',
      location: 'Berlin, Germany',
      quote: 'What impressed me most is their commitment to building this responsibly. They\'re not promising overnight miracles, but a thoughtful, research-driven approach to AI legal assistance. I\'m on the waitlist.',
      avatar: '👑',
      expertise: 'Tech & IP Law',
      profileUrl: '#'
    },
    {
      username: '@JusticeHammer',
      title: 'Former Judge, Commercial Court',
      location: 'London, UK',
      quote: 'Their long-term vision of AI judges is ambitious but grounded in reality. The team understands the legal system deeply and is building with integrity. I\'m following this project closely.',
      avatar: '⚖️',
      expertise: 'Commercial Litigation',
      profileUrl: '#'
    },
    {
      username: '@ResearchNinja_DE',
      title: 'Legal Researcher & Author',
      location: 'Munich, Germany',
      quote: 'I\'ve seen many AI legal tools, but Lex\'s approach stands out. They\'re transparent about being in development, focused on getting it right rather than rushing to market. That\'s the kind of team I trust.',
      avatar: '🥷',
      expertise: 'Legal Research & AI Ethics',
      profileUrl: '#'
    },
    {
      username: '@ContractWizard',
      title: 'Managing Partner, Boutique Law Firm',
      location: 'Vienna, Austria',
      quote: 'The potential for AI to augment—not replace—legal professionals is enormous. This team gets it. They\'re building tools that respect the complexity of law while making legal services more accessible.',
      avatar: '🧙',
      expertise: 'Business Law',
      profileUrl: '#'
    }
  ];

  return (
    <section className="mb-20" id="testimonials">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="mr-2">💬</span>
          What Legal Professionals Say
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Legal Professionals</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Legal experts on our platform collaborate in AI-powered data rooms with multi-level privacy controls, transparent interactions, and secure case management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <a
                href={testimonial.profileUrl}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
                title="View profile"
              >
                {testimonial.avatar}
              </a>
              <div className="flex-1 min-w-0">
                <a
                  href={testimonial.profileUrl}
                  className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                >
                  {testimonial.username}
                </a>
                <p className="text-xs text-gray-600 leading-tight">{testimonial.title}</p>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            <div className="mb-4 flex-1">
              <p className="text-gray-700 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {testimonial.expertise}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Join Legal Professionals Shaping the Future</h3>
          <p className="text-gray-700 mb-6">
            Collaborate on cases in secure, AI-powered data rooms. Control access levels, ensure transparency between attorneys and clients, and work together seamlessly—all while maintaining the highest standards of confidentiality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#get-started"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Join the Waitlist
            </a>
            <a
              href="#vision"
              className="rounded-lg border-2 border-blue-600 px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Read Our Vision
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
