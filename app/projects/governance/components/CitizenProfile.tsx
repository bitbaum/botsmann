'use client';

import { useState, useEffect } from 'react';
import {
  type CitizenData,
  type AdvisoryDistribution,
  type CitizenProfileTab,
} from '@/types/governance';
import { type AgencyData } from './AgencyProfile';
import {
  CitizenProfileHeader,
  CitizenProfileTabs,
  CitizenOverviewTab,
  CitizenTaxTab,
  CitizenBenefitsTab,
  CitizenAdvisoryTab,
} from './citizen';

// Re-export types for backward compatibility
export type {
  TaxPayment,
  CitizenContribution,
  CitizenBenefit,
  CitizenData,
  AdvisoryDistribution,
} from '@/types/governance';

interface CitizenProfileProps {
  citizen: CitizenData;
  agencies: AgencyData[];
}

const CitizenProfile: React.FC<CitizenProfileProps> = ({ citizen, agencies: _agencies }) => {
  const [activeTab, setActiveTab] = useState<CitizenProfileTab>('overview');
  const [advisoryDistribution, setAdvisoryDistribution] = useState<AdvisoryDistribution[]>([]);
  const [sliderTotal, setSliderTotal] = useState(100);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize advisory distribution from citizen contributions
  useEffect(() => {
    if (citizen.contributions.length > 0) {
      const initialDistribution = citizen.contributions.map((contribution) => ({
        agencyId: contribution.agencyId,
        agencyName: contribution.agencyName,
        currentPercentage: contribution.percentage,
        advisoryPercentage: contribution.percentage,
        difference: 0,
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- seeds editable advisory distribution from the citizen prop
      setAdvisoryDistribution(initialDistribution);
    }
  }, [citizen.contributions]);

  const handleDistributionChange = (agencyId: string, value: number) => {
    const updatedDistribution = advisoryDistribution.map((item) => {
      if (item.agencyId === agencyId) {
        return {
          ...item,
          advisoryPercentage: value,
          difference: value - item.currentPercentage,
        };
      }
      return item;
    });

    const newTotal = updatedDistribution.reduce((sum, item) => sum + item.advisoryPercentage, 0);
    setSliderTotal(newTotal);
    setAdvisoryDistribution(updatedDistribution);
    setHasChanges(true);
  };

  const resetAdvisoryDistribution = () => {
    const resetDistribution = advisoryDistribution.map((item) => ({
      ...item,
      advisoryPercentage: item.currentPercentage,
      difference: 0,
    }));
    setAdvisoryDistribution(resetDistribution);
    setSliderTotal(100);
    setHasChanges(false);
  };

  const submitAdvisoryDistribution = () => {
    alert('Tax distribution preferences submitted! (This is an advisory recommendation only)');
    setHasChanges(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CitizenProfileHeader citizen={citizen} />
      <CitizenProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'overview' && <CitizenOverviewTab citizen={citizen} />}

        {activeTab === 'tax' && <CitizenTaxTab taxHistory={citizen.taxHistory} />}

        {activeTab === 'benefits' && <CitizenBenefitsTab benefits={citizen.benefits} />}

        {activeTab === 'advisory' && (
          <CitizenAdvisoryTab
            advisoryDistribution={advisoryDistribution}
            sliderTotal={sliderTotal}
            hasChanges={hasChanges}
            onDistributionChange={handleDistributionChange}
            onReset={resetAdvisoryDistribution}
            onSubmit={submitAdvisoryDistribution}
          />
        )}
      </div>
    </div>
  );
};

export default CitizenProfile;
