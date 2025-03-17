/**
 * Imhotep (Medical Expert) Bot Page
 * 
 * This is the main page component for the Imhotep medical expert bot.
 * It orchestrates all the sections and components that make up the bot's interface,
 * providing a comprehensive medical information and advice experience.
 * 
 * The page includes:
 * - Hero section with introduction
 * - Medical disclaimer
 * - Features and how-to sections
 * - Interactive demo for asking health questions
 * - Health topics explorer
 * - Common health Q&A
 * - Patient intake form
 * 
 * @module ImhotepPage
 */

'use client';

import React from 'react';
import bots from '../../../data/bots';
// Import the styles
import './styles.css';

// Basic component imports
import Navigation from './components/navigation/Navigation';
import HeroSection from './components/hero/HeroSection';
import DisclaimerSection from './components/disclaimer/DisclaimerSection';
import PatientFeaturesSection from './components/patient/PatientFeaturesSection';
import HealthcareProfessionalsSection from './components/professionals/HealthcareProfessionalsSection';
import HealthEducationSection from './components/education/HealthEducationSection';
import FutureProductsSection from './components/future/FutureProductsSection';
import VisionAndJoinSection from './components/vision/VisionAndJoinSection';

/**
 * Main page component for the Imhotep health assistant bot
 * with restructured sections for improved flow
 * 
 * @returns {JSX.Element} The rendered page
 */
export default function MedicalExpert() {
  // Find bot data from the global bots configuration
  const bot = bots.find(b => b.slug === 'medical-expert');

  // Function to get the ChatGPT bot URL
  const getTryLink = () => {
    return 'https://chatgpt.com/g/g-oAUMruOWt-dr-imhotep';
  };

  // If bot data is not found, show error
  if (!bot) {
    return <div className="p-8 text-center">Health Assistant bot configuration not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <Navigation className="imhotep-navigation" />
      
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Hero Section */}
        <HeroSection 
          title="Imhotep"
          overview="Your AI health companion for evidence-based wellness"
          getTryLink={getTryLink}
        />
        
        {/* Medical Disclaimer */}
        <DisclaimerSection />
        
        {/* Patient Features Section */}
        <section id="patient-features" className="scroll-mt-24">
          <PatientFeaturesSection 
            features={bot.features}
            getTryLink={getTryLink}
          />
        </section>
        
        {/* Healthcare Professionals Section */}
        <section id="for-professionals" className="scroll-mt-24">
          <HealthcareProfessionalsSection />
        </section>
        
        {/* Health Education Section */}
        <section id="health-education" className="scroll-mt-24">
          <HealthEducationSection getTryLink={getTryLink} />
        </section>
        
        {/* Future Products Section */}
        <section id="coming-soon" className="scroll-mt-24">
          <FutureProductsSection />
        </section>
        
        {/* Vision and Join Us Section */}
        <section id="vision-and-join" className="scroll-mt-24">
          <VisionAndJoinSection />
        </section>
      </main>
    </div>
  );
}
