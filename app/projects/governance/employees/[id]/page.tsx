'use client';

import React from 'react';
import Link from 'next/link';
import { sampleTeamMembers } from '../../data/sampleData';

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employeeId = params.id;
  
  // Find the employee with the matching ID
  const employee = sampleTeamMembers.find(emp => emp.id === employeeId);
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // If employee not found, show error and link back to all employees
  if (!employee) {
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
            <Link
              href="/projects/governance/employees"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Employees
            </Link>
          </nav>
          
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
            <p className="text-gray-600 mb-6">
              The employee profile you are looking for could not be found.
            </p>
            <Link
              href="/projects/governance/employees"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Employees
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
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
          <Link
            href="/projects/governance/employees"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Employees
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-sm text-gray-900">{employee.name}</span>
        </nav>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          {/* Employee Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                {employee.imageUrl ? (
                  <img
                    className="h-16 w-16 rounded-full border-4 border-white"
                    src={employee.imageUrl}
                    alt={employee.name}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full border-4 border-white bg-blue-300 flex items-center justify-center text-blue-800 text-2xl">
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">{employee.name}</h1>
                  <p className="text-blue-100">{employee.position}</p>
                  <p className="text-blue-200 text-sm">{employee.department}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-900 bg-opacity-50 text-blue-100`}>
                  Transparency Score: {employee.transparency}/100
                </span>
              </div>
            </div>
          </div>
          
          {/* Employee Bio */}
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Professional Biography</h2>
            <p className="text-gray-600">{employee.bio}</p>
          </div>
          
          {/* Employment Details */}
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Employment Details</h2>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Years of Service</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.yearsOfService} years</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Annual Salary</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(employee.salary)}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Office Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.contact.office}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={`mailto:${employee.contact.email}`} className="text-blue-600 hover:text-blue-500">
                    {employee.contact.email}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.contact.phone}</dd>
              </div>
            </dl>
          </div>
          
          {/* Responsibilities */}
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Responsibilities & Authority</h2>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Key Responsibilities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {employee.responsibilities.map((resp, index) => (
                  <li key={index} className="flex text-sm text-gray-600">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Placeholder for decision authority - would be populated from real data */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Decision-Making Authority</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex">
                  <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Can approve expenditures up to {formatCurrency(employee.position.includes('Director') ? 50000 : 10000)}
                </li>
                <li className="flex">
                  <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {employee.position.includes('Director') ? 'Final approval' : 'Recommends'} for departmental policies
                </li>
                <li className="flex">
                  <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {employee.position.includes('Director') || employee.position.includes('Chief') ? 'Participates in' : 'Provides input for'} strategic planning
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Performance & Transparency */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Performance & Transparency</h2>
            <p className="mt-1 text-sm text-gray-500">
              Performance metrics and transparency indicators for this public servant.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-4">Transparency Score Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-sm font-medium text-green-800">Disclosure Compliance</h4>
                    <span className="text-sm font-semibold text-green-700">
                      {Math.round(employee.transparency * 0.95)}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.round(employee.transparency * 0.95)}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs text-green-700">
                    Measures completeness of required public disclosures
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-sm font-medium text-blue-800">Decision Documentation</h4>
                    <span className="text-sm font-semibold text-blue-700">
                      {Math.round(employee.transparency * 0.9)}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.round(employee.transparency * 0.9)}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs text-blue-700">
                    Evaluates documentation of decisions and rationales
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-sm font-medium text-purple-800">Public Responsiveness</h4>
                    <span className="text-sm font-semibold text-purple-700">
                      {Math.round(employee.transparency * 1.05)}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${Math.min(100, Math.round(employee.transparency * 1.05))}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs text-purple-700">
                    Measures responsiveness to public inquiries and feedback
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-4">Performance Highlights</h3>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Projects Managed</h4>
                    <p className="text-xl font-semibold text-gray-900">{employee.yearsOfService * 2 + 4}</p>
                    <p className="text-xs text-gray-500 mt-1">+{employee.yearsOfService < 5 ? 2 : 1} from previous year</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Budget Responsibility</h4>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(employee.salary * 8)}</p>
                    <p className="text-xs text-gray-500 mt-1">For current fiscal year</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Team Size</h4>
                    <p className="text-xl font-semibold text-gray-900">{employee.position.includes('Director') ? 12 : employee.position.includes('Manager') ? 6 : 2}</p>
                    <p className="text-xs text-gray-500 mt-1">Direct reports</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Public Engagement</h4>
                    <p className="text-xl font-semibold text-gray-900">{employee.position.includes('Relations') ? 95 : 78}%</p>
                    <p className="text-xs text-gray-500 mt-1">Response rate to inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact and Feedback */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Contact & Feedback</h2>
            <p className="mt-1 text-sm text-gray-500">
              Ways to contact this employee or provide feedback on their performance.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-4">Contact Information</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={`mailto:${employee.contact.email}`} className="text-blue-600 hover:text-blue-500">
                        {employee.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{employee.contact.phone}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Office</dt>
                    <dd className="mt-1 text-sm text-gray-900">{employee.contact.office}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-4">Provide Feedback</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your feedback helps improve public service and ensures accountability.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 