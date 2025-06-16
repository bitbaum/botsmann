'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  expertise: string;
  message: string;
}

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      // Simulate a successful submission for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      reset();
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="mx-auto max-w-xl bg-white p-8 rounded-lg shadow-sm border border-green-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for joining our community!</h3>
          <p className="text-sm text-gray-600 mb-6">
            We're excited about your interest in collaborating. We'll be in touch soon to discuss how we can work together on groundbreaking AI solutions.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-500 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl bg-white p-6 md:p-8 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Join Our Community</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
            Area of Expertise
          </label>
          <select
            {...register('expertise', { required: 'Please select an area of expertise' })}
            id="expertise"
            className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-brand-500 sm:text-sm"
          >
            <option value="">Select your expertise</option>
            <option value="engineering">Software Engineering</option>
            <option value="research">AI Research</option>
            <option value="domain">Domain Expert</option>
            <option value="design">UX/UI Design</option>
            <option value="other">Other</option>
          </select>
          {errors.expertise && (
            <p className="mt-1 text-sm text-red-600">{errors.expertise.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            How would you like to collaborate?
          </label>
          <textarea
            {...register('message', { required: 'Please tell us how you would like to collaborate' })}
            rows={4}
            id="message"
            placeholder="Describe your interests and how you'd like to contribute..."
            className="mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500 sm:text-sm"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {submitError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-500 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Join the Community'}
        </button>
      </form>
    </div>
  );
}
