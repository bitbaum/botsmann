'use client';

import React from 'react';
import { CitizenData } from '../types';
import { formatCurrency, getTransparencyScoreColor, getTransparencyBarColor } from '../utils';

interface OverviewTabProps {
  citizen: CitizenData;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ citizen }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Citizen Summary</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your personal information and government interaction overview.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.name}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.address}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">District</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.district}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Local Voting District</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.local}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">State Voting District</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.state}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Federal Voting District</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.federal}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Elected Representative</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {citizen.representativeName || 'Not assigned'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{citizen.registeredSince}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Annual Tax Contribution</dt>
            <dd className="mt-1 text-sm font-bold text-gray-900">
              {formatCurrency(citizen.totalTaxContribution)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium text-gray-900">Current Tax Distribution</h3>
        <p className="mt-1 text-sm text-gray-500">
          How your tax contributions are currently allocated across agencies.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {citizen.contributions.map((contribution) => (
          <div
            key={contribution.agencyId}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-base font-medium text-gray-900">{contribution.agencyName}</h4>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTransparencyScoreColor(contribution.transparencyScore)}`}
              >
                T-Score: {contribution.transparencyScore}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Annual Contribution:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(contribution.amount)}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Percentage:</span>
                <span className="font-medium text-gray-900">{contribution.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getTransparencyBarColor(contribution.transparencyScore)}`}
                  style={{ width: `${contribution.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-500 mb-1">Contribution History</h5>
              <div className="flex items-center space-x-1">
                {contribution.contributionHistory.map((year) => (
                  <div
                    key={year.year}
                    className="text-xs"
                    title={`${year.year}: ${formatCurrency(year.amount)}`}
                  >
                    <div className="w-6 bg-gray-100 rounded">
                      <div
                        className="bg-blue-500 rounded"
                        style={{
                          height: `${Math.max(15, Math.min(60, (year.amount / citizen.totalTaxContribution) * 300))}px`,
                        }}
                      ></div>
                    </div>
                    <div className="text-center mt-1">{year.year.slice(-2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
