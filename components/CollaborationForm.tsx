/**
 * Collaboration Form Component
 * 
 * Form for people interested in collaborating on AI research and development
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  expertise: string;
  interests: string;
};

export default function CollaborationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, we would send this data to an API endpoint
      // await fetch('/api/collaboration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-medium text-green-800 mb-3">Thanks for joining our community!</h3>
        <p className="text-green-700 mb-4">
          We're excited to collaborate with you on building the future of AI. 
          We'll be in touch soon to discuss how we can work together.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 text-left">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 text-left">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Your Background
          </label>
          <select
            id="expertise"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.expertise ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('expertise', { required: 'Please select your background' })}
          >
            <option value="">Select your primary expertise</option>
            <option value="software-engineering">Software Engineering</option>
            <option value="data-science">Data Science & Machine Learning</option>
            <option value="ui-design">UI/UX Design</option>
            <option value="medical-research">Medical Research</option>
            <option value="healthcare-provider">Healthcare Provider</option>
            <option value="other">Other</option>
          </select>
          {errors.expertise && (
            <p className="mt-1 text-sm text-red-600 text-left">{errors.expertise.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            How would you like to collaborate?
          </label>
          <textarea
            id="interests"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.interests ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Tell us about your interests and how you'd like to collaborate with us"
            {...register('interests', { required: 'Please share your interests' })}
          />
          {errors.interests && (
            <p className="mt-1 text-sm text-red-600 text-left">{errors.interests.message}</p>
          )}
        </div>
        
        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {submitError}
          </div>
        )}
        
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white rounded-md ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            } transition-colors`}
          >
            {isSubmitting ? 'Sending...' : 'Join the Community'}
          </button>
        </div>
      </form>
    </div>
  );
} 