'use client';

import React from 'react';
import { AgencyData, formatCurrency, getTransparencyColor } from './types';

interface AgencyHeaderProps {
  agency: AgencyData;
}

export const AgencyHeader: React.FC<AgencyHeaderProps> = ({ agency }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate">
            {agency.name}
          </h1>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Established: {agency.establishment}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Budget: {formatCurrency(agency.budget.total)}/yr</span>
            </div>
            <div className="mt-2 flex items-center">
              <div
                className={`px-2 py-1 text-xs font-medium rounded-full ${getTransparencyColor(
                  agency.transparencyScore,
                )}`}
              >
                Transparency Score: {agency.transparencyScore}/100
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request Information
            </button>
          </span>
          <span className="ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Rate Services
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
);
