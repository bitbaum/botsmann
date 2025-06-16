import React from 'react';
import { DemoState } from '../../types';
import DemoPopup from './DemoPopup';
import { btnPrimary } from '../../utils/constants';

interface DemoModeOverlayProps {
  demoState: DemoState;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onContinue: () => void;
  onClose: () => void;
}

const DemoModeOverlay = ({ 
  demoState, 
  onInputChange, 
  onSubmit, 
  onContinue, 
  onClose 
}: DemoModeOverlayProps) => {
  const { step, prompt, response } = demoState;
  
  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Vocabulary Builder Demo</h3>
            <button 
              className="text-gray-400 hover:text-gray-500" 
              onClick={onClose}
              aria-label="Close demo mode"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Try entering a word or phrase you'd like to learn in Swiss German:
          </p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="E.g., hello, thank you, goodbye"
                value={prompt}
                onChange={(e) => onInputChange(e.target.value)}
                aria-label="Enter word or phrase"
              />
              <p className="text-xs text-gray-500 mt-1">
                Try "hello", "thank you", or any common greeting
              </p>
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit" 
                className={btnPrimary}
                disabled={!prompt.trim()}
                aria-label="Submit word or phrase"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  if (step === 2 && response) {
    return <DemoPopup response={response} onContinue={onContinue} onClose={onClose} />;
  }
  
  return null;
};

export default DemoModeOverlay; 