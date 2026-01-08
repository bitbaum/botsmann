'use client';

import React, { useState, useEffect } from 'react';
import { AgencyData } from './AgencyProfile';

export interface TaxPayment {
  id: string;
  year: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Late' | 'Disputed';
  type: 'Income' | 'Property' | 'Sales' | 'Other';
  reference: string;
}

export interface CitizenContribution {
  agencyId: string;
  agencyName: string;
  amount: number;
  percentage: number;
  transparencyScore: number;
  contributionHistory: Array<{
    year: string;
    amount: number;
  }>;
}

export interface CitizenBenefit {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual';
  provider: string;
  providerId: string;
  dateReceived: string;
  status: 'Active' | 'Pending' | 'Expired';
}

export interface CitizenData {
  id: string;
  name: string;
  address: string;
  district: string;
  registeredSince: string;
  avatarUrl?: string;
  taxHistory: TaxPayment[];
  contributions: CitizenContribution[];
  benefits: CitizenBenefit[];
  representativeId?: string;
  representativeName?: string;
  totalTaxContribution: number;
  votingDistricts: {
    local: string;
    state: string;
    federal: string;
  };
  participationScore: number; // 0-100 based on voting, feedback, etc.
}

export interface AdvisoryDistribution {
  agencyId: string;
  agencyName: string;
  currentPercentage: number;
  advisoryPercentage: number;
  difference: number;
}

interface CitizenProfileProps {
  citizen: CitizenData;
  agencies: AgencyData[];
}

const CitizenProfile: React.FC<CitizenProfileProps> = ({ citizen, agencies: _agencies }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tax' | 'benefits' | 'advisory'>('overview');
  const [advisoryDistribution, setAdvisoryDistribution] = useState<AdvisoryDistribution[]>([]);
  const [sliderTotal, setSliderTotal] = useState(100);
  const [hasChanges, setHasChanges] = useState(false);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleDistributionChange = (agencyId: string, value: number) => {
    const updatedDistribution = advisoryDistribution.map(item => {
      if (item.agencyId === agencyId) {
        return {
          ...item,
          advisoryPercentage: value,
          difference: value - item.currentPercentage
        };
      }
      return item;
    });
    
    const newTotal = updatedDistribution.reduce((sum, item) => sum + item.advisoryPercentage, 0);
    setSliderTotal(newTotal);
    setAdvisoryDistribution(updatedDistribution);
    setHasChanges(true);
  };
  
  useEffect(() => {
    if (citizen.contributions.length > 0) {
      const initialDistribution = citizen.contributions.map(contribution => ({
        agencyId: contribution.agencyId,
        agencyName: contribution.agencyName,
        currentPercentage: contribution.percentage,
        advisoryPercentage: contribution.percentage,
        difference: 0
      }));
      setAdvisoryDistribution(initialDistribution);
    }
  }, [citizen.contributions]);
  
  const resetAdvisoryDistribution = () => {
    const resetDistribution = advisoryDistribution.map(item => ({
      ...item,
      advisoryPercentage: item.currentPercentage,
      difference: 0
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
      <div className="relative bg-gradient-to-r from-blue-600 to-green-600 px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0 flex items-center">
              {citizen.avatarUrl ? (
                <img
                  className="h-16 w-16 rounded-full border-4 border-white"
                  src={citizen.avatarUrl}
                  alt={citizen.name}
                />
              ) : (
                <div className="h-16 w-16 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                  {citizen.name.charAt(0)}
                </div>
              )}
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white truncate">{citizen.name}</h1>
                <p className="text-white opacity-90">Citizen ID: {citizen.id}</p>
                <p className="text-white opacity-80">Registered since {citizen.registeredSince}</p>
              </div>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Participation Score: {citizen.participationScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`${
              activeTab === 'tax'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
          >
            Tax History
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`${
              activeTab === 'benefits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
          >
            Benefits Received
          </button>
          <button
            onClick={() => setActiveTab('advisory')}
            className={`${
              activeTab === 'advisory'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
          >
            Advisory Distribution
          </button>
        </nav>
      </div>
      
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">Citizen Summary</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your personal information and government interaction overview.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.address}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">District</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.district}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Local Voting District</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.local}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">State Voting District</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.state}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Federal Voting District</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.votingDistricts.federal}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Elected Representative</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.representativeName || 'Not assigned'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{citizen.registeredSince}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Annual Tax Contribution</dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">{formatCurrency(citizen.totalTaxContribution)}</dd>
                </div>
              </dl>
            </div>
            
            <div className="mt-8 mb-4">
              <h3 className="text-lg font-medium text-gray-900">Current Tax Distribution</h3>
              <p className="mt-1 text-sm text-gray-500">
                How your tax contributions are currently allocated across agencies.
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {citizen.contributions.map((contribution) => (
                <div 
                  key={contribution.agencyId} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-medium text-gray-900">{contribution.agencyName}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      contribution.transparencyScore >= 90 ? 'bg-green-100 text-green-800' :
                      contribution.transparencyScore >= 70 ? 'bg-blue-100 text-blue-800' :
                      contribution.transparencyScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      T-Score: {contribution.transparencyScore}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Annual Contribution:</span>
                      <span className="font-medium text-gray-900">{formatCurrency(contribution.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Percentage:</span>
                      <span className="font-medium text-gray-900">{contribution.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          contribution.transparencyScore >= 90 ? 'bg-green-500' :
                          contribution.transparencyScore >= 70 ? 'bg-blue-500' :
                          contribution.transparencyScore >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${contribution.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Contribution History</h5>
                    <div className="flex items-center space-x-1">
                      {contribution.contributionHistory.map((year) => (
                        <div 
                          key={year.year} 
                          className="text-xs"
                          title={`${year.year}: ${formatCurrency(year.amount)}`}
                        >
                          <div className="w-6 bg-gray-100 rounded">
                            <div 
                              className="bg-blue-500 rounded"
                              style={{ 
                                height: `${Math.max(15, Math.min(60, (year.amount / citizen.totalTaxContribution) * 300))}px` 
                              }}
                            ></div>
                          </div>
                          <div className="text-center mt-1">{year.year.slice(-2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tax' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">Tax Payment History</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your complete tax contribution history across all categories.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reference
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {citizen.taxHistory.map((tax) => (
                          <tr key={tax.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{tax.date}</div>
                              <div className="text-sm text-gray-500">For {tax.year}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{tax.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(tax.amount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                tax.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                tax.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                tax.status === 'Late' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {tax.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {tax.reference}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Need help understanding your tax payments? Contact a tax specialist for assistance.
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <button className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                        Contact Support <span aria-hidden="true">&rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'benefits' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">Benefits Received</h2>
              <p className="mt-1 text-sm text-gray-500">
                Government services and benefits you have received.
              </p>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {citizen.benefits.map((benefit) => (
                  <li key={benefit.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">{benefit.name}</p>
                          <p className="ml-2 flex-shrink-0 flex">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              benefit.status === 'Active' ? 'bg-green-100 text-green-800' :
                              benefit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {benefit.status}
                            </span>
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 text-sm font-medium text-gray-900">
                          {formatCurrency(benefit.amount)}
                          <span className="text-xs text-gray-500 ml-1">({benefit.frequency})</span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <span>Provider: </span>
                            <a href={`/projects/governance/agencies/${benefit.providerId}`} className="ml-1 text-blue-600 hover:text-blue-500">
                              {benefit.provider}
                            </a>
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            Date Received: {benefit.dateReceived}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Benefits eligibility check</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>You may be eligible for 3 additional benefits based on your profile. Click below to explore your options.</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <button type="button" className="bg-green-100 px-3 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Check Eligibility
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'advisory' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">Advisory Tax Distribution</h2>
              <p className="mt-1 text-sm text-gray-500">
                Indicate how you would like your tax contributions to be allocated across agencies.
                <strong className="text-blue-800 ml-2 font-semibold">This is advisory only and does not change your actual tax allocation.</strong>
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your preferences will be recorded and shared with policymakers, but actual budget allocations 
                      are determined through the democratic process. This feedback helps representatives understand 
                      citizen priorities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  {advisoryDistribution.map((item) => (
                    <div key={item.agencyId} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor={`slider-${item.agencyId}`} className="block text-sm font-medium text-gray-700">
                          {item.agencyName}
                        </label>
                        <span className={`text-sm font-medium ${
                          item.difference > 0 ? 'text-green-600' : 
                          item.difference < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.advisoryPercentage}% 
                          {item.difference !== 0 && (
                            <span className="ml-1">
                              ({item.difference > 0 ? '+' : ''}{item.difference}%)
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
                            onChange={(e) => handleDistributionChange(item.agencyId, parseInt(e.target.value))}
                            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                              sliderTotal > 100 ? 'bg-red-200' : 'bg-blue-200'
                            }`}
                          />
                        </div>
                        <div className="w-10 flex items-center justify-center">
                          <div className={`w-4 h-4 rounded-full ${
                            item.difference > 0 ? 'bg-green-500' : 
                            item.difference < 0 ? 'bg-red-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Current: {item.currentPercentage}%</span>
                        <span>Change: {item.difference > 0 ? '+' : ''}{item.difference}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Total Allocation</span>
                    <span className={`text-sm font-medium ${
                      sliderTotal > 100 ? 'text-red-600' : 
                      sliderTotal < 100 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {sliderTotal}%
                      {sliderTotal !== 100 && (
                        <span className="ml-1">
                          ({sliderTotal > 100 ? '+' : ''}{sliderTotal - 100}%)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                      className={`h-full rounded-full ${
                        sliderTotal > 100 ? 'bg-red-500' : 
                        sliderTotal < 100 ? 'bg-yellow-500' : 'bg-green-500'
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
                onClick={resetAdvisoryDistribution}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset to Current
              </button>
              <button
                type="button"
                onClick={submitAdvisoryDistribution}
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
        )}
      </div>
    </div>
  );
};

export default CitizenProfile; 