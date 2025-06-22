"use client";

import React from "react";

/**
 * Call-to-Action section component for Solon Governance platform
 * Encouraging users to request a demo or learn more
 */
const CTASection: React.FC = () => {
  return (
    <section id="demo" className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 p-8 md:p-12 shadow-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Governance?
          </h2>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto mb-8">
            Join the future of decentralized direct democracy. Contact us to
            learn more about implementing Solon in your jurisdiction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <h3 className="text-xl font-semibold mb-3">Request a Demo</h3>
              <p className="text-white text-opacity-80 mb-4">
                See Solon in action with a live demonstration tailored to your
                governance needs.
              </p>
              <button className="w-full py-3 bg-white text-green-600 font-medium rounded-md hover:bg-opacity-90 transition-colors">
                Schedule Demo
              </button>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p className="text-white text-opacity-80 mb-4">
                Speak with our governance experts about implementing Solon in
                your community.
              </p>
              <button className="w-full py-3 bg-white text-green-600 font-medium rounded-md hover:bg-opacity-90 transition-colors">
                Book Consultation
              </button>
            </div>
          </div>

          <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-white text-opacity-80">
                  Stay updated on Solon's latest developments, case studies, and
                  governance innovations.
                </p>
              </div>
              <div className="md:w-1/3 w-full">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-grow px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600">info@solondemocracy.org</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Community
            </h3>
            <p className="text-gray-600">Join our Discord community</p>
            <p className="text-gray-600">
              Follow us on Twitter @SolonDemocracy
            </p>
          </div>

          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Resources
            </h3>
            <p className="text-gray-600">Download our whitepaper</p>
            <p className="text-gray-600">View case studies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
