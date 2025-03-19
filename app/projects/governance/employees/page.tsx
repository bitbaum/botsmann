'use client';

import React from 'react';
import Link from 'next/link';
import { sampleTeamMembers } from '../data/sampleData';

export default function EmployeesPage() {
  // Helper function to get transparency score color
  const getTransparencyColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <nav className="mb-6 flex items-center">
          <Link 
            href="/projects/governance/portal"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Portal
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-sm text-gray-900">Government Employees</span>
        </nav>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Government Employees</h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore the public servants working to deliver government services
          </p>
        </header>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee Transparency Index</h2>
          <p className="text-gray-600 mb-6">
            Our employee transparency system promotes accountability by making key information about public servants 
            available to citizens. Review roles, responsibilities, and performance metrics for the individuals 
            responsible for managing public resources.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {sampleTeamMembers.map((employee) => (
              <Link 
                href={`/projects/governance/employees/${employee.id}`}
                key={employee.id}
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="bg-blue-50 p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.position}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransparencyColor(employee.transparency)} bg-opacity-10`}>
                      T-Score: {employee.transparency}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 mb-3">{employee.department}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{employee.bio}</p>
                  
                  <div className="mt-auto">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Key Details</div>
                    <dl className="grid grid-cols-2 gap-1">
                      <dt className="text-xs text-gray-500">Years of Service:</dt>
                      <dd className="text-xs text-gray-900">{employee.yearsOfService}</dd>
                      <dt className="text-xs text-gray-500">Salary:</dt>
                      <dd className="text-xs text-gray-900">{formatCurrency(employee.salary)}</dd>
                    </dl>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
                    View Profile
                    <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transparency Standards</h2>
          <p className="text-gray-600 mb-4">
            Our employee profiles adhere to strict standards of transparency while respecting privacy. Here's what's included:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-600 mb-2">Basic Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Name and position</li>
                <li>• Department affiliation</li>
                <li>• Years of public service</li>
                <li>• Professional biography</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-600 mb-2">Accountability</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Public roles and responsibilities</li>
                <li>• Decision-making authority</li>
                <li>• Contact information for inquiries</li>
                <li>• Salary information (as permitted by law)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-600 mb-2">Privacy Protection</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No personal contact information</li>
                <li>• No family details</li>
                <li>• No detailed employment history</li>
                <li>• No personally identifiable information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 