import React from 'react';
import { DemoResponse } from '../../types';
import { btnPrimary } from '../../utils/constants';

interface DemoPopupProps {
  response: DemoResponse;
  onContinue: () => void;
  onClose: () => void;
}

const DemoPopup = ({ response, onContinue, onClose }: DemoPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Vocabulary Result</h3>
          <button 
            className="text-gray-400 hover:text-gray-500" 
            onClick={onClose}
            aria-label="Close popup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-lg text-gray-900">{response.word}</h4>
                <p className="text-gray-600">{response.translation}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                response.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                response.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {response.difficulty}
              </span>
            </div>
          </div>
          
          <table className="w-full mb-4">
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-700 w-1/3">Example</td>
                <td className="py-2 text-gray-600 italic">{response.example}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-700">Pronunciation</td>
                <td className="py-2 text-gray-600">{response.pronunciation}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Notes</td>
                <td className="py-2 text-gray-600">{response.notes}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mb-4">
            <p>
              <span className="font-semibold">Heidi says:</span> Swiss German often replaces High German words with French-derived terms like "merci" instead of "danke."
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button onClick={onContinue} className={btnPrimary} aria-label="Continue with demo">
            Continue Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPopup; 