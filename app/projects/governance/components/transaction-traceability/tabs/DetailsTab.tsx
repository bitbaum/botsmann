'use client';

import React from 'react';
import { EnhancedTransaction } from '../types';

interface DetailsTabProps {
  transaction: EnhancedTransaction;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ transaction }) => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Transaction Metrics</h3>
        <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Cost Per Unit</dt>
            <dd className="mt-1 text-sm text-gray-900">{transaction.metrics.costPerUnit}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Timeline Status</dt>
            <dd className="mt-1 text-sm text-gray-900">{transaction.metrics.timeline}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Quality Score</dt>
            <dd className="mt-1 text-sm text-gray-900">{transaction.metrics.qualityScore}/100</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Contract Compliance</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {transaction.metrics.contractCompliance}%
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Public Engagement</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="comment" className="sr-only">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={3}
              className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
              placeholder="Add your comment about this transaction..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
