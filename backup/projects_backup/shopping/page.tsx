"use client";

import React from "react";
import Link from "next/link";

export default function Shopping() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">
            Recurring Purchases Automation
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Effortlessly manage all your recurring commitments—whether it's
            physical supplies, recurring services, or digital subscriptions—in
            one centralized dashboard.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Replenishable Goods
            </h2>
            <p className="mb-6 text-gray-600">
              Manage supplies, industrial inputs, raw materials, and more. Our
              predictive analytics and dynamic scheduling ensure you never run
              out of essentials.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Recurring Services
            </h2>
            <p className="mb-6 text-gray-600">
              Stay on top of cleaning, safety audits, maintenance, and other
              services with automated scheduling and real-time alerts.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Subscriptions
            </h2>
            <p className="mb-6 text-gray-600">
              Track and manage your software subscriptions—from cloud services
              to SaaS tools like Calendly—with consolidated billing and
              automated renewal notifications.
            </p>
          </div>
        </div>

        {/* Dashboard Features */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Dashboard Features
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Get a comprehensive view of all your recurring commitments in one
              place. Customize thresholds, set reminders, and gain data-driven
              insights to optimize spending.
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• Unified overview of goods, services, and subscriptions</li>
              <li>• Customizable reorder and renewal thresholds</li>
              <li>• Automated alerts and renewal notifications</li>
              <li>• Detailed analytics for cost and usage optimization</li>
              <li>
                • Upcoming replenishments dashboard with timeline visualization
              </li>
              <li>• Usage history tracking to identify consumption patterns</li>
              <li>
                • Smart home/IoT device integration for real-time tracking
              </li>
              <li>• Budget management with spending forecasts and alerts</li>
            </ul>
            <p className="text-gray-600">
              Whether you're managing a household or a business, our dashboard
              simplifies recurring management.
            </p>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            See It In Action
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Interactive Dashboard Demo</p>
              {/* Replace with actual demo or screenshot */}
            </div>
            <p className="text-gray-600">
              Our intuitive dashboard gives you a bird's-eye view of all your
              recurring commitments, with detailed insights just a click away.
            </p>
          </div>
        </div>

        {/* Set Up Your Dashboard */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Set Up Your Dashboard
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <label
                htmlFor="query"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Enter an essential product or service (e.g., 'toilet paper',
                'maintenance', 'cloud storage')
              </label>
              <input
                type="text"
                id="query"
                className="block w-full rounded-md border-gray-200 px-4 py-2 text-gray-900 shadow-sm focus:border-openai-green focus:ring-openai-green sm:text-sm"
                placeholder="Type your product or service name"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Configure My Dashboard
            </button>
          </div>
        </div>

        {/* Integration Partners */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Integration Partners
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Seamlessly connect with the platforms and services you already
              use:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">ERP System</span>
              </div>
              <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">CRM Platform</span>
              </div>
              <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">Accounting Software</span>
              </div>
              <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">IoT Devices</span>
              </div>
            </div>
            <p className="text-gray-600">
              Our open API architecture enables integration with virtually any
              enterprise system.
            </p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Case Study: Acme Corporation
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Acme Corporation, a mid-sized manufacturing firm, streamlined its
              inventory and service management using our automated replenishment
              system.
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>
                • <strong>Challenge:</strong> Inefficient manual reordering and
                service scheduling led to downtime.
              </li>
              <li>
                • <strong>Solution:</strong> Integration with their ERP and
                service management systems enabled real-time tracking and
                dynamic scheduling.
              </li>
              <li>
                • <strong>Results:</strong> 30% reduction in downtime and 25%
                decrease in inventory holding costs within 6 months.
              </li>
            </ul>
            <p className="text-gray-600">
              Acme Corporation now enjoys a seamless supply chain and service
              management experience.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Case Study: SoftCo Enterprise
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              SoftCo Enterprise revolutionized its digital subscription
              management by consolidating all its recurring software services on
              our dashboard.
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>
                • <strong>Challenge:</strong> Disorganized subscription renewals
                and escalating costs.
              </li>
              <li>
                • <strong>Solution:</strong> A unified dashboard with automated
                alerts and consolidated billing improved their management
                process.
              </li>
              <li>
                • <strong>Results:</strong> 40% improvement in renewal
                compliance and 20% reduction in subscription overhead in the
                first quarter.
              </li>
            </ul>
            <p className="text-gray-600">
              With our system, SoftCo Enterprise now manages all its digital
              subscriptions effortlessly.
            </p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Pricing Plans
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Personal
              </h3>
              <p className="mb-4 text-3xl font-bold">
                $29<span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="mb-6 text-gray-600">
                Perfect for individuals and home management
              </p>
              <ul className="mb-6 space-y-3 text-gray-600">
                <li>• Up to 50 recurring items</li>
                <li>• Basic analytics</li>
                <li>• Email notifications</li>
                <li>• 30-day history</li>
              </ul>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Get Started
              </button>
            </div>

            <div className="rounded-2xl border-2 border-openai-green bg-white p-8 shadow-md relative">
              <div className="absolute top-0 right-0 bg-openai-green text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Business
              </h3>
              <p className="mb-4 text-3xl font-bold">
                $99<span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="mb-6 text-gray-600">
                Ideal for small to medium businesses
              </p>
              <ul className="mb-6 space-y-3 text-gray-600">
                <li>• Up to 500 recurring items</li>
                <li>• Advanced analytics</li>
                <li>• SMS & email notifications</li>
                <li>• 1-year history</li>
                <li>• Basic API access</li>
              </ul>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                Get Started
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Enterprise
              </h3>
              <p className="mb-4 text-3xl font-bold">Custom</p>
              <p className="mb-6 text-gray-600">
                For large organizations with complex needs
              </p>
              <ul className="mb-6 space-y-3 text-gray-600">
                <li>• Unlimited recurring items</li>
                <li>• Custom analytics</li>
                <li>• Custom notifications</li>
                <li>• Unlimited history</li>
                <li>• Full API access</li>
                <li>• Dedicated support</li>
              </ul>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-md border border-openai-green bg-white px-4 py-2 text-sm font-medium text-openai-green hover:bg-gray-50"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Enterprise-Grade Security
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Your data security is our top priority. Our platform is built with
              industry-leading security measures:
            </p>
            <ul className="mb-6 space-y-3 text-gray-600">
              <li>• SOC 2 Type II certified</li>
              <li>• End-to-end encryption</li>
              <li>• Role-based access controls</li>
              <li>• Regular security audits</li>
              <li>• GDPR and CCPA compliant</li>
            </ul>
            <p className="text-gray-600">
              We treat your data with the utmost care, applying enterprise-grade
              security at every level.
            </p>
          </div>
        </div>

        {/* Get Started / Contact */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Get Started
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              Ready to transform the way you manage recurring commitments?
              Whether it's physical goods, services, or digital subscriptions,
              our unified dashboard has you covered.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
