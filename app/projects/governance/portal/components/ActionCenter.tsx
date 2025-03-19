'use client';

import React from 'react';
import Link from 'next/link';

interface PendingAction {
  id: string;
  type: 'vote' | 'review' | 'delegate';
  title: string;
  description: string;
  deadline: string;
  taxImpact: string;
  path: string;
}

interface ActionCenterProps {
  pendingActions: PendingAction[];
}

/**
 * Displays pending actions requiring user attention
 */
const ActionCenter: React.FC<ActionCenterProps> = ({ pendingActions }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Action Center</h3>
      <p className="text-gray-600 mb-6">
        Review and act on pending votes, proposals, and delegations that impact your tax dollars.
      </p>
      
      <div className="space-y-6">
        {pendingActions.map((action) => (
          <div key={action.id} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 rounded-full p-2 ${
                  action.type === 'vote' ? 'bg-purple-100' :
                  action.type === 'review' ? 'bg-amber-100' :
                  'bg-blue-100'
                }`}>
                  <span className="text-xl">
                    {action.type === 'vote' ? '🗳️' :
                     action.type === 'review' ? '⚖️' :
                     '👥'}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{action.title}</h4>
                  <p className="text-gray-600 mt-1">{action.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <svg className="mr-1.5 h-2 w-2 text-red-800" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Deadline: {action.deadline}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {action.taxImpact}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={{ pathname: action.path }}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Take Action
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">Suggestion Box</h4>
        <p className="text-sm text-gray-600 mb-3">
          Have an idea for how taxes should be spent in your community? Submit a suggestion for consideration.
        </p>
        <div className="flex">
          <input
            type="text"
            className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Your suggestion for tax allocation..."
          />
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionCenter; 