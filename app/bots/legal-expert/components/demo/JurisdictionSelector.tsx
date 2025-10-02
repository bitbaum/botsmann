'use client';

import React, { useState } from 'react';
import { JurisdictionHierarchy, getPopularJurisdictions, getJurisdictionPath } from './jurisdictions';

interface JurisdictionSelectorProps {
  jurisdictions: JurisdictionHierarchy[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

const JurisdictionSelector: React.FC<JurisdictionSelectorProps> = ({
  jurisdictions,
  selectedCode,
  onSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLevel, setCurrentLevel] = useState<JurisdictionHierarchy[]>(jurisdictions);
  const [breadcrumb, setBreadcrumb] = useState<JurisdictionHierarchy[]>([]);
  const [showPopular, setShowPopular] = useState(true);

  const popularJurisdictions = getPopularJurisdictions();

  const handleSelect = (jurisdiction: JurisdictionHierarchy) => {
    if (jurisdiction.children && jurisdiction.children.length > 0) {
      // Has children - drill down
      setBreadcrumb([...breadcrumb, jurisdiction]);
      setCurrentLevel(jurisdiction.children);
      setShowPopular(false);
    } else {
      // No children - final selection
      onSelect(jurisdiction.code);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      // Back to root
      setBreadcrumb([]);
      setCurrentLevel(jurisdictions);
      setShowPopular(true);
    } else {
      // Go back to specific level
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);
      setCurrentLevel(newBreadcrumb[index].children || jurisdictions);
    }
  };

  const handleSkipRefinement = () => {
    if (breadcrumb.length > 0) {
      const lastJurisdiction = breadcrumb[breadcrumb.length - 1];
      onSelect(lastJurisdiction.code);
    }
  };

  // Filter jurisdictions based on search
  const filteredJurisdictions = searchQuery
    ? currentLevel.filter(j =>
        j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentLevel;

  const selectedPath = selectedCode ? getJurisdictionPath(selectedCode) : [];

  return (
    <div className="space-y-4">
      {/* Search Bar - Mobile Optimized */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search jurisdiction..."
          className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-base"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
      </div>

      {/* Breadcrumb Navigation */}
      {breadcrumb.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            🏠 All
          </button>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={item.code}>
              <span className="text-gray-400">›</span>
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors"
              >
                {item.flag} {item.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Skip Refinement Option */}
      {breadcrumb.length > 0 && (
        <button
          onClick={handleSkipRefinement}
          className="w-full px-4 py-3 border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>✓</span>
          Use {breadcrumb[breadcrumb.length - 1].name} (Skip refinement)
        </button>
      )}

      {/* Popular Jurisdictions - Show only at root level */}
      {showPopular && !searchQuery && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Popular</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {popularJurisdictions.slice(0, 8).map((jurisdiction) => (
              <button
                key={jurisdiction.code}
                onClick={() => handleSelect(jurisdiction)}
                className={`
                  p-3 rounded-lg border-2 transition-all text-left
                  ${selectedCode === jurisdiction.code
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 active:scale-95'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{jurisdiction.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {jurisdiction.name}
                    </div>
                    {jurisdiction.children && (
                      <div className="text-xs text-gray-500">
                        {jurisdiction.children.length} sub-jurisdictions →
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Level Jurisdictions - Mobile-First Grid */}
      <div className="space-y-2">
        {!showPopular && !searchQuery && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {breadcrumb.length > 0 ? 'Refine Selection' : 'All Jurisdictions'}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        )}

        {filteredJurisdictions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm">No jurisdictions found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredJurisdictions.map((jurisdiction) => (
              <button
                key={jurisdiction.code}
                onClick={() => handleSelect(jurisdiction)}
                className={`
                  p-3 rounded-lg border-2 transition-all text-left
                  ${selectedCode === jurisdiction.code
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 active:scale-95'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{jurisdiction.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {jurisdiction.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {jurisdiction.type}
                      {jurisdiction.children && ` · ${jurisdiction.children.length} sub-regions`}
                    </div>
                  </div>
                  {jurisdiction.children && (
                    <span className="text-blue-500">›</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Jurisdiction Display */}
      {selectedCode && selectedPath.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-600 text-lg">✓</span>
            <span className="text-sm font-semibold text-green-900">Selected Jurisdiction</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedPath.map((item, index) => (
              <React.Fragment key={item.code}>
                {index > 0 && <span className="text-green-600">›</span>}
                <span className="text-sm text-green-800">
                  {item.flag} {item.name}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center">
        💡 Tap to drill down, or skip refinement to select broader jurisdiction
      </p>
    </div>
  );
};

export default JurisdictionSelector;
