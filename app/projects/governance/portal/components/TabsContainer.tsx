"use client";

import React, { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsContainerProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  showFilter: boolean;
  filter?: string;
  onFilterChange?: (filter: string) => void;
  children: ReactNode;
}

/**
 * Container component for tabs with optional filter dropdown
 */
const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  activeTab,
  onTabChange,
  showFilter,
  filter = "all",
  onFilterChange,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
      <div className="border-b border-gray-200">
        <div className="px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="overflow-x-auto py-2 flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-4 px-1 whitespace-nowrap border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {showFilter && onFilterChange && (
            <div className="py-3 sm:py-0">
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="publicsafety">Public Safety</option>
                <option value="recreation">Recreation</option>
                <option value="administration">Administration</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default TabsContainer;
