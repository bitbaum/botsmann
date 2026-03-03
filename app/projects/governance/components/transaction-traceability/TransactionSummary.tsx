'use client';

import React from 'react';
import Link from 'next/link';
import { EnhancedTransaction, getTransparencyColor } from './types';

interface TransactionSummaryProps {
  transaction: EnhancedTransaction;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({ transaction }) => (
  <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Department</span>
        <Link
          href={{
            pathname: '/projects/governance/agencies/[id]',
            query: { id: transaction.departmentId },
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {transaction.department}
        </Link>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Recipient</span>
        <span className="text-sm font-medium text-gray-900">{transaction.recipient}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Transparency Score</span>
        <div className="flex items-center mt-1">
          <div
            className={`h-2 w-full rounded-full ${getTransparencyColor(transaction.transparencyScore)}`}
          >
            <div
              className="h-2 rounded-full bg-green-200"
              style={{ width: `${transaction.transparencyScore}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            {transaction.transparencyScore}/100
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Social Engagement</span>
        <div className="flex items-center space-x-3 mt-1">
          <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{transaction.socialData.likes}</span>
          </button>
          <button className="flex items-center text-sm text-gray-500 hover:text-yellow-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{transaction.socialData.concerns}</span>
          </button>
          <button className="flex items-center text-sm text-gray-500 hover:text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>{transaction.socialData.publicComments}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
