'use client';

import React from 'react';
import { NextSection } from '@/src/components/navigation/NextSection';

export default function ProjectFinance() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-12">
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Project Finance</h1>
          <p className="mb-8 text-lg text-gray-600">
            A revolutionary platform for transparent project finance and management. Start projects,
            manage funding, and track progress with complete public visibility. Every transaction,
            decision, and milestone is open to the public, fostering trust and accountability.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Easy Project Creation</h3>
            <p className="text-gray-600">Start any project with a few clicks. Define goals, milestones, and funding needs with our intuitive interface.</p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Multiple Funding Sources</h3>
            <p className="text-gray-600">Accept donations, credit, or investments. Track all contributions transparently and provide real-time updates to stakeholders.</p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Public Financial Dashboard</h3>
            <p className="text-gray-600">Real-time visibility into project finances, tasks, and progress. Monitor every transaction and milestone in real-time.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Task Management</h3>
            <p className="text-gray-600">Break down projects into tasks, assign costs, and track completion. Every task's budget and progress is visible to all stakeholders.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Public Audit Trail</h3>
            <p className="text-gray-600">Complete transparency with every transaction logged and visible. Built-in tools for financial stewardship and accountability.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold">Insights and Analytics</h3>
            <p className="text-gray-600">Data-driven insights into project performance, spending patterns, and milestone achievement rates.</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">How It Works</h2>
          <div className="space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-2xl font-medium">1. Project Setup</h3>
              <p className="text-gray-600">
                Create your project with a clear description, goals, and funding requirements. 
                Break down the project into tasks, each with its own budget and timeline. 
                All this information is immediately public and searchable.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-2xl font-medium">2. Funding Collection</h3>
              <p className="text-gray-600">
                Accept multiple types of funding: donations, investments, or credit. Each contribution 
                is tracked and displayed in real-time. Donors and investors can see exactly how their 
                money is being used.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-2xl font-medium">3. Transparent Execution</h3>
              <p className="text-gray-600">
                As the project progresses, every transaction and task update is automatically recorded 
                and displayed. Stakeholders can track progress, view financial statements, and monitor 
                milestone completion in real-time.
              </p>
            </div>
          </div>
        </div>

        <NextSection
          nextPage="/about"
          title="Learn About Our Philosophy"
          description="Discover how our commitment to transparency and automation drives everything we do."
        />
      </main>
    </div>
  );
}
