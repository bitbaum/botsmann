import { useState, useCallback } from 'react';
import { WaitlistFormState, WaitlistPreferences } from '../types';
import { isValidEmail } from '../utils/validation';

const initialPreferences: WaitlistPreferences = {
  learningTools: true,
  communityFeatures: false,
  authenticContent: true,
  culturalInsights: false,
  earlyAccess: true,
  emailUpdates: true
};

/**
 * Hook to manage waitlist form state and submission
 */
export const useWaitlistForm = () => {
  const [formState, setFormState] = useState<WaitlistFormState>({
    email: '',
    preferences: initialPreferences,
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const updateEmail = useCallback((email: string) => {
    setFormState(prev => ({
      ...prev,
      email,
      error: null
    }));
  }, []);

  const togglePreference = useCallback((key: keyof WaitlistPreferences) => {
    setFormState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!isValidEmail(formState.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a valid email address'
      }));
      return;
    }

    // Start submission
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null
    }));

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true
      }));
      
    } catch (error) {
      // Error handling
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Failed to submit'
      }));
    }
  }, [formState.email]);

  return {
    formState,
    updateEmail,
    togglePreference,
    handleSubmit
  };
};

export default useWaitlistForm; 