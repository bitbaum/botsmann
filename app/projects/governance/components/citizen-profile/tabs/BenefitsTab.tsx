'use client';

import React from 'react';
import { CitizenBenefit } from '../types';
import { formatCurrency, getStatusColor } from '../utils';

interface BenefitsTabProps {
  benefits: CitizenBenefit[];
}

export const BenefitsTab: React.FC<BenefitsTabProps> = ({ benefits }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Benefits Received</h2>
        <p className="mt-1 text-sm text-gray-500">
          Government services and benefits you have received.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {benefits.map((benefit) => (
            <li key={benefit.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">{benefit.name}</p>
                    <p className="ml-2 flex-shrink-0 flex">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(benefit.status)}`}
                      >
                        {benefit.status}
                      </span>
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 text-sm font-medium text-gray-900">
                    {formatCurrency(benefit.amount)}
                    <span className="text-xs text-gray-500 ml-1">({benefit.frequency})</span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span>Provider: </span>
                      <a
                        href={`/projects/governance/agencies/${benefit.providerId}`}
                        className="ml-1 text-blue-600 hover:text-blue-500"
                      >
                        {benefit.provider}
                      </a>
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Date Received: {benefit.dateReceived}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Benefits eligibility check</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  You may be eligible for 3 additional benefits based on your profile. Click below
                  to explore your options.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    className="bg-green-100 px-3 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
