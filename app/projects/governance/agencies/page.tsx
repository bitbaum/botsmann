"use client";

import React from "react";
import Link from "next/link";
import { sampleAgencies } from "../data/sampleData";

const AgenciesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Government Agencies
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore all government agencies, their performance metrics, and
            transparency scores.
          </p>
        </div>

        <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Agency Transparency Index
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete, accessible profiles of all government agencies and their
              operations.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleAgencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={{
                    pathname: "/projects/governance/agencies/[id]",
                    query: { id: agency.id },
                  }}
                  className="block bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      {agency.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agency.transparencyScore >= 90
                          ? "bg-green-100 text-green-800"
                          : agency.transparencyScore >= 70
                            ? "bg-blue-100 text-blue-800"
                            : agency.transparencyScore >= 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      T-Score: {agency.transparencyScore}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {agency.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Budget: </span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                          notation: "compact",
                        }).format(agency.budget.total)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Spent: </span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                          notation: "compact",
                        }).format(agency.budget.spent)}
                      </span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(agency.budget.spent / agency.budget.allocated) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Est. {agency.establishment.split(" ")[0]}
                    </div>
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      View Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Comparative Analysis
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              How agencies compare across key metrics and performance
              indicators.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Agency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transparency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget Efficiency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Citizens Served
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Response Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleAgencies
                    .sort((a, b) => b.transparencyScore - a.transparencyScore)
                    .map((agency) => (
                      <tr key={agency.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link
                            href={{
                              pathname: "/projects/governance/agencies/[id]",
                              query: { id: agency.id },
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {agency.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex ${
                              agency.transparencyScore >= 90
                                ? "bg-green-100 text-green-800"
                                : agency.transparencyScore >= 70
                                  ? "bg-blue-100 text-blue-800"
                                  : agency.transparencyScore >= 50
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {agency.transparencyScore}/100
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {Math.round(
                              (agency.budget.spent / agency.budget.allocated) *
                                100,
                            )}
                            %
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Intl.NumberFormat("en-US").format(
                              agency.citizenImpact.citizensServed,
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {agency.citizenImpact.avgResponseTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center text-sm ${
                              agency.citizenImpact.satisfactionScore >= 90
                                ? "text-green-600"
                                : agency.citizenImpact.satisfactionScore >= 70
                                  ? "text-blue-600"
                                  : agency.citizenImpact.satisfactionScore >= 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            {agency.citizenImpact.satisfactionScore}%
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenciesPage;
