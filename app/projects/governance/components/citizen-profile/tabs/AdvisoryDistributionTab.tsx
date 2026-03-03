'use client';

import React from 'react';
import { AdvisoryDistribution } from '../types';

interface AdvisoryDistributionTabProps {
  advisoryDistribution: AdvisoryDistribution[];
  sliderTotal: number;
  hasChanges: boolean;
  onDistributionChange: (agencyId: string, value: number) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export const AdvisoryDistributionTab: React.FC<AdvisoryDistributionTabProps> = ({
  advisoryDistribution,
  sliderTotal,
  hasChanges,
  onDistributionChange,
  onReset,
  onSubmit,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Advisory Tax Distribution</h2>
        <p className="mt-1 text-sm text-gray-500">
          Indicate how you would like your tax contributions to be allocated across agencies.
          <strong className="text-blue-800 ml-2 font-semibold">
            This is advisory only and does not change your actual tax allocation.
          </strong>
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Your preferences will be recorded and shared with policymakers, but actual budget
                allocations are determined through the democratic process. This feedback helps
                representatives understand citizen priorities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            {advisoryDistribution.map((item) => (
              <div
                key={item.agencyId}
                className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor={`slider-${item.agencyId}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {item.agencyName}
                  </label>
                  <span
                    className={`text-sm font-medium ${
                      item.difference > 0
                        ? 'text-green-600'
                        : item.difference < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {item.advisoryPercentage}%
                    {item.difference !== 0 && (
                      <span className="ml-1">
                        ({item.difference > 0 ? '+' : ''}
                        {item.difference}%)
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      id={`slider-${item.agencyId}`}
                      type="range"
                      min="0"
                      max="100"
                      value={item.advisoryPercentage}
                      onChange={(e) =>
                        onDistributionChange(item.agencyId, parseInt(e.target.value))
                      }
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                        sliderTotal > 100 ? 'bg-red-200' : 'bg-blue-200'
                      }`}
                    />
                  </div>
                  <div className="w-10 flex items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.difference > 0
                          ? 'bg-green-500'
                          : item.difference < 0
                            ? 'bg-red-500'
                            : 'bg-gray-400'
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Current: {item.currentPercentage}%</span>
                  <span>
                    Change: {item.difference > 0 ? '+' : ''}
                    {item.difference}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Allocation</span>
              <span
                className={`text-sm font-medium ${
                  sliderTotal > 100
                    ? 'text-red-600'
                    : sliderTotal < 100
                      ? 'text-yellow-600'
                      : 'text-green-600'
                }`}
              >
                {sliderTotal}%
                {sliderTotal !== 100 && (
                  <span className="ml-1">
                    ({sliderTotal > 100 ? '+' : ''}
                    {sliderTotal - 100}%)
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${
                  sliderTotal > 100
                    ? 'bg-red-500'
                    : sliderTotal < 100
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, sliderTotal)}%` }}
              ></div>
            </div>
            {sliderTotal !== 100 && (
              <p className="mt-2 text-sm text-red-600">
                {sliderTotal > 100
                  ? `Your total allocation exceeds 100% by ${sliderTotal - 100}%. Please adjust to reach exactly 100%.`
                  : `Your total allocation is under 100% by ${100 - sliderTotal}%. Please adjust to reach exactly 100%.`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset to Current
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={sliderTotal !== 100 || !hasChanges}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            sliderTotal !== 100 || !hasChanges
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          Submit Advisory Preferences
        </button>
      </div>
    </div>
  );
};
