"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success message
      setFormState({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Have questions about our AI solutions? We're here to help. Reach out
          to our team using the form below.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Get in Touch
          </h2>

          <div className="mb-8 space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">
                <a
                  href="mailto:info@botsmann.com"
                  className="text-openai-green hover:underline"
                >
                  info@botsmann.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Office Hours
              </h3>
              <p className="text-gray-600">Monday – Friday: 9am – 5pm CET</p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Location
              </h3>
              <p className="text-gray-600">Zurich, Switzerland</p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Looking for a demo?
            </h3>
            <p className="text-gray-600 mb-4">
              Schedule a personalized demo with one of our product specialists
              to see our AI solutions in action.
            </p>
            <button
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-openai-green border border-openai-green hover:bg-openai-green hover:text-white transition-colors"
              onClick={() =>
                window.open("https://calendly.com/botsmann/demo", "_blank")
              }
            >
              Schedule a Demo
            </button>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Request a Consultation
          </h2>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            {isSubmitted ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-openai-green"
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
                <h3 className="mt-3 text-xl font-medium text-gray-900">
                  Thank you!
                </h3>
                <p className="mt-2 text-gray-600">
                  We've received your message and will get back to you soon.
                </p>
                <button
                  className="mt-5 rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openai-green focus:outline-none focus:ring-1 focus:ring-openai-green"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openai-green focus:outline-none focus:ring-1 focus:ring-openai-green"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openai-green focus:outline-none focus:ring-1 focus:ring-openai-green"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openai-green focus:outline-none focus:ring-1 focus:ring-openai-green"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity disabled:bg-opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
