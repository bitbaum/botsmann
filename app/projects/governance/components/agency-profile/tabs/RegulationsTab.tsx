'use client';

import React from 'react';
import Link from 'next/link';
import { AgencyRegulation, getStatusColor, getKpiStatusColor } from '../types';

interface RegulationsTabProps {
  regulations: AgencyRegulation[];
}

export const RegulationsTab: React.FC<RegulationsTabProps> = ({ regulations }) => (
  <div>
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {regulations.map((regulation) => (
          <li key={regulation.id}>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{regulation.title}</h3>
                <div className="ml-2 flex-shrink-0 flex">
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      regulation.status,
                    )}`}
                  >
                    {regulation.status.charAt(0).toUpperCase() + regulation.status.slice(1)}
                  </p>
                </div>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{regulation.description}</p>

              <div className="mt-3 sm:mt-4">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Enacted: {regulation.dateEnacted} | Last Updated: {regulation.lastUpdated}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 sm:mt-0">
                    Enabling Law:{' '}
                    <Link
                      href={{
                        pathname: '/projects/governance/open-law/[id]',
                        query: { id: regulation.enablingLawId },
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {regulation.enablingLawName}
                    </Link>
                  </p>
                </div>
              </div>

              {/* KPIs */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500">Performance Metrics:</h4>
                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {regulation.kpis.map((kpi, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3 w-3 rounded-full ${getKpiStatusColor(
                            kpi.status,
                          )}`}
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{kpi.metric}</p>
                          <p className="text-sm text-gray-500">
                            {kpi.current} / {kpi.target}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
