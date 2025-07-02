'use client';

import React from 'react';

// Import all components
import HeroSection from './components/HeroSection';
import CoreComponentsSection from './components/CoreComponentsSection';
import ApplicationsSection from './components/ApplicationsSection';
import WhitepaperSection from './components/WhitepaperSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';

/**
 * Solon - Decentralized Direct Democracy Governance Platform Page
 * 
 * This is the main page component for the Solon governance platform.
 * It follows the bot page structure for consistency with other Botsmann offerings.
 * 
 * @module SolonGovernancePage
 */
export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Core Components Section */}
        <CoreComponentsSection />
        
        {/* Application Areas Section */}
        <ApplicationsSection />
        
        {/* Whitepaper Section */}
        <WhitepaperSection />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Call-to-Action Section */}
        <CTASection />
      </main>
    </div>
  );
}
