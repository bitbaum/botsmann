import React from 'react';
import { useWaitlistForm } from '../../hooks/useWaitlistForm';
import { btnPrimary } from '../../utils/constants';
import { WaitlistPreferences } from '../../types';

const WaitlistForm = () => {
  const { formState, updateEmail, togglePreference, handleSubmit } = useWaitlistForm();
  const { email, preferences, isSubmitting, isSubmitted, error } = formState;

  // Map of preference keys to display text
  const preferenceLabels: Record<keyof WaitlistPreferences, string> = {
    learningTools: "Advanced learning tools and pronunciation features",
    communityFeatures: "Community features and language exchange",
    authenticContent: "Authentic Swiss German content and media",
    culturalInsights: "Cultural insights and local events",
    earlyAccess: "Early access to new features",
    emailUpdates: "Email updates about product development"
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
        <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          You've been added to our waitlist. We'll notify you when we have updates about the features you're interested in.
        </p>
      </div>
    );
  }

  return (
    <form id="waitlist-form" onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Join the Waitlist</h3>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => updateEmail(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="your@email.com"
          required
          aria-describedby={error ? "email-error" : undefined}
        />
        {error && <p id="email-error" className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      <div className="mb-6">
        <p className="block text-sm font-medium text-gray-700 mb-2">
          I'm interested in: (select all that apply)
        </p>
        <div className="space-y-2">
          {Object.entries(preferenceLabels).map(([key, label]) => (
            <div key={key} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`preference-${key}`}
                  type="checkbox"
                  checked={preferences[key as keyof WaitlistPreferences]}
                  onChange={() => togglePreference(key as keyof WaitlistPreferences)}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`preference-${key}`} className="text-gray-700">
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${btnPrimary} w-full sm:w-auto ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          aria-label="Join waitlist"
        >
          {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </div>
    </form>
  );
};

export default WaitlistForm; 