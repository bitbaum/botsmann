'use client';

import React from 'react';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tooltip: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

/**
 * Displays a grid of metrics with values, trends, and tooltips
 */
const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative group">
          <p className="text-sm font-medium text-gray-500">{metric.label}</p>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            <p className={`flex items-center text-sm ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {metric.change}
              {metric.trend === 'up' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {metric.trend === 'down' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </p>
          </div>
          {/* Tooltip */}
          {metric.tooltip && (
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 -bottom-8 left-0 right-0 mx-auto w-max z-10">
              {metric.tooltip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid; 