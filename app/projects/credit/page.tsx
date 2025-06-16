'use client';

import React from 'react';
import { NextSection } from '../../../src/components/navigation/NextSection';

export default function Credit() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Credit Workflow Automation</h1>
      
      <div className="mb-12">
        <p className="text-lg text-gray-600">
          Streamline your credit operations with our AI-powered workflow automation solution. 
          Monitor portfolio companies, analyze financial data, and make informed decisions faster.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-semibold">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Automated Reporting</h3>
            <p className="text-gray-600">
              Automatically ingest and process regular reports from portfolio companies, saving time and reducing errors.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Debt Monitoring</h3>
            <p className="text-gray-600">
              Track and analyze debt metrics in real-time with automated alerts for key thresholds.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-medium">Financial Analysis</h3>
            <p className="text-gray-600">
              Comprehensive analysis of financials, KPIs, and qualitative factors including investor information.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-semibold">How It Works</h2>
        <div className="space-y-8">
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-xl font-semibold text-white">
                1
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium">Data Integration</h3>
              <p className="text-gray-600">
                Connect your portfolio companies' reporting systems for automated data ingestion.
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-xl font-semibold text-white">
                2
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI processes financial data, identifies trends, and generates insights automatically.
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-xl font-semibold text-white">
                3
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium">Monitoring Dashboard</h3>
              <p className="text-gray-600">
                Access real-time insights and alerts through an intuitive dashboard interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Ready to Transform Your Workflow?</h2>
        <p className="mb-6 text-lg text-gray-600">
          Let us help you automate your credit operations and make better decisions faster.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-brand-500 px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition-opacity"
        >
          Contact Us
        </a>
      </section>

      <NextSection
        nextPage="/projects"
        title="Explore Our Transformational Projects"
        description="Discover our long-term initiatives that are reshaping industries and creating positive change."
      />
    </div>
  );
}
