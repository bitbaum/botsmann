'use client';

import React from 'react';
import Link from 'next/link';

interface TaxCategory {
  category: string;
  percentage: number;
  amount: string;
}

interface TaxFundedProject {
  category: string;
  title: string;
  impact: string;
  contribution: string;
  total: string;
  link: string;
}

interface TaxFlowProps {
  taxAllocation: TaxCategory[];
  taxFundedProjects: TaxFundedProject[];
  filter: string;
  onFilterChange: (filter: string) => void;
}

/**
 * Displays tax allocation breakdown and tax-funded projects
 */
const TaxFlow: React.FC<TaxFlowProps> = ({ 
  taxAllocation, 
  taxFundedProjects, 
  filter, 
  onFilterChange 
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Your Tax Flow</h3>
          <p className="mt-1 text-gray-500">See how your $3,200 in annual taxes is allocated across government services</p>
        </div>
        <div className="mt-4 md:mt-0 p-2 bg-green-50 rounded-md">
          <p className="text-sm font-medium text-green-800">Community Impact: 15,000+ citizens served</p>
        </div>
      </div>
      
      {/* Tax allocation breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Tax Allocation Breakdown</h4>
        <div className="space-y-4">
          {taxAllocation.map((category) => (
            <div key={category.category}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <span className="ml-2 text-xs text-gray-500">({category.percentage}%)</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category.amount}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    category.category === 'Infrastructure' ? 'bg-blue-500' :
                    category.category === 'Education' ? 'bg-amber-500' :
                    category.category === 'Healthcare' ? 'bg-red-500' :
                    category.category === 'Public Safety' ? 'bg-purple-500' :
                    category.category === 'Recreation' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-500">
          <p>Note: Visualization represents FY 2023-2024 tax allocations. Future visualizations will include interactive Sankey diagrams.</p>
        </div>
      </div>

      {/* Recent tax-funded projects */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium text-gray-900">Recent Tax-Funded Projects</h4>
          <select 
            className="text-sm border-gray-300 rounded-md"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Districts</option>
            <option value="downtown">Downtown District</option>
            <option value="north">North Side</option>
            <option value="west">Western District</option>
          </select>
        </div>
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taxFundedProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    project.category === 'Infrastructure' ? 'bg-blue-100 text-blue-800' :
                    project.category === 'Education' ? 'bg-amber-100 text-amber-800' :
                    project.category === 'Recreation' ? 'bg-green-100 text-green-800' :
                    project.category === 'Public Safety' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500">Your contribution: {project.contribution}</span>
                </div>
                <h5 className="font-medium text-gray-900">{project.title}</h5>
                <p className="text-sm text-gray-600 mt-1">{project.impact}</p>
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-gray-500">Total: {project.total}</span>
                  <Link href={{ pathname: project.link }} className="text-xs text-green-700 hover:text-green-800">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxFlow; 