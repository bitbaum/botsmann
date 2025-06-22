"use client";

import React, { useState } from "react";

const ExampleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Project management example tabs
  const tabs = [
    { name: "Project Plan", id: "plan" },
    { name: "Technical Strategy", id: "strategy" },
    { name: "Sprint Planning", id: "sprint" },
    { name: "Implementation Guide", id: "implementation" },
  ];

  // Project management content examples
  const exampleContent = [
    // Project Plan
    <div key="plan" className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-4">Project Plan & Timeline</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Project Overview</h4>
        <p className="text-gray-700 mb-3">
          The User Authentication System will provide secure identity
          verification, role-based access control, and seamless integration with
          third-party OAuth providers for the Cursor application.
        </p>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex flex-col">
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Project Timeline
              </h5>
              <div className="relative">
                <div className="absolute top-3 left-3 bottom-3 w-0.5 bg-blue-200"></div>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-semibold text-gray-800">
                          Planning & Requirements (2 weeks)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Define user flows, security requirements, and
                          integration points
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-semibold text-gray-800">
                          Core Authentication (3 weeks)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Implement user registration, login, and session
                          management
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-semibold text-gray-800">
                          OAuth Integration (2 weeks)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Add support for Google, GitHub, and Microsoft
                          authentication
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-semibold text-gray-800">
                          Role-Based Access Control (2 weeks)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Implement permission system with role hierarchy
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 z-10">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">5</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-semibold text-gray-800">
                          Testing & Refinement (1 week)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Security testing, performance optimization, and bug
                          fixes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Resource Allocation
              </h5>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Allocation
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phase
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        Backend Developer
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">2 FTE</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        All Phases
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        Frontend Developer
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">1 FTE</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        Phase 2-4
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        Security Engineer
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        0.5 FTE
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        Phase 1, 5
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        QA Engineer
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">1 FTE</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        Phase 5
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Technical Strategy
    <div key="strategy" className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-4">Technical Strategy</h3>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium mr-2">
              ARCHITECTURE
            </div>
            <h4 className="font-medium text-gray-900">
              Authentication Service Design
            </h4>
          </div>
          <p className="text-gray-700 mb-2">
            The authentication system will use a microservice architecture to
            ensure scalability and maintainability.
          </p>
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-lg p-3 w-full max-w-md text-center mb-2">
                <span className="font-medium">API Gateway</span>
              </div>
              <svg
                className="h-8 w-8 text-gray-400 my-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-2">
                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <span className="font-medium">Auth Service</span>
                </div>
                <div className="bg-indigo-100 rounded-lg p-3 text-center">
                  <span className="font-medium">User Service</span>
                </div>
              </div>
              <svg
                className="h-8 w-8 text-gray-400 my-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              <div className="bg-purple-100 rounded-lg p-3 w-full max-w-md text-center">
                <span className="font-medium">Database Cluster</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium mr-2">
              TECHNOLOGY
            </div>
            <h4 className="font-medium text-gray-900">
              Tech Stack Recommendations
            </h4>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-800 text-xs">BE</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Node.js with Express
                  </span>
                </div>
                <p className="text-xs text-gray-600 pl-8">
                  Provides excellent performance for API-driven applications
                  with extensive middleware ecosystem
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-800 text-xs">FE</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    React with Next.js
                  </span>
                </div>
                <p className="text-xs text-gray-600 pl-8">
                  Server-side rendering improves security for authentication
                  flows
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-800 text-xs">DB</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    PostgreSQL
                  </span>
                </div>
                <p className="text-xs text-gray-600 pl-8">
                  Reliable, ACID-compliant database with excellent support for
                  JSON data
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-800 text-xs">SEC</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    JWT with Refresh Tokens
                  </span>
                </div>
                <p className="text-xs text-gray-600 pl-8">
                  Stateless authentication with secure token refresh mechanism
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Sprint Planning
    <div key="sprint" className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-4">Sprint Planning</h3>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 mb-2">
          Sprint 1: Core Authentication (2 weeks)
        </h4>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-800 text-xs">1</span>
                </div>
                <span className="font-medium text-gray-900">
                  User Registration Flow
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                5 Story Points
              </div>
            </div>
            <div className="pl-8">
              <p className="text-sm text-gray-600 mb-2">
                Implement secure registration with email verification and
                password strength validation
              </p>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Create registration API endpoint
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Implement email verification service
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Build registration form UI with validation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-800 text-xs">2</span>
                </div>
                <span className="font-medium text-gray-900">
                  Login & Session Management
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                8 Story Points
              </div>
            </div>
            <div className="pl-8">
              <p className="text-sm text-gray-600 mb-2">
                Create secure login flow with JWT tokens and refresh mechanism
              </p>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Implement login API with rate limiting
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Create JWT token generation and validation
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Design and implement refresh token flow
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Build login UI with form validation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-800 text-xs">3</span>
                </div>
                <span className="font-medium text-gray-900">
                  Password Management
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                5 Story Points
              </div>
            </div>
            <div className="pl-8">
              <p className="text-sm text-gray-600 mb-2">
                Implement secure password reset and change functionality
              </p>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Create password reset flow with tokens
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Implement password change functionality
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-sm border border-gray-300 mr-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">
                    Build password reset and change UI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          Sprint Velocity & Capacity
        </h4>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Story Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">
                  Alex (Backend)
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">90%</td>
                <td className="px-4 py-2 text-sm text-gray-500">10</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">
                  Taylor (Backend)
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">100%</td>
                <td className="px-4 py-2 text-sm text-gray-500">12</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">
                  Jordan (Frontend)
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">80%</td>
                <td className="px-4 py-2 text-sm text-gray-500">8</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  Team Total
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">90%</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  30
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>,

    // Implementation Guide
    <div key="implementation" className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-4">Implementation Guide</h3>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 mb-2">
          Authentication API Design
        </h4>
        <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto code-scrollbar">
          <pre>{`// API Routes Structure
POST /api/auth/register     // Create new user account
POST /api/auth/login        // Authenticate user & issue tokens
POST /api/auth/refresh      // Refresh access token
POST /api/auth/logout       // Invalidate tokens
POST /api/auth/verify-email // Verify user email
POST /api/auth/forgot-password // Request password reset
POST /api/auth/reset-password  // Set new password with token
`}</pre>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 mb-2">User Model Design</h4>
        <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto code-scrollbar">
          <pre>{`// User Schema
{
  "id": "uuid-v4",
  "email": "user@example.com",
  "password": "hashed_password",  // bcrypt with salt
  "firstName": "John",
  "lastName": "Doe",
  "emailVerified": true,
  "createdAt": "2023-04-12T23:20:50.52Z",
  "updatedAt": "2023-04-12T23:20:50.52Z",
  "lastLogin": "2023-04-12T23:20:50.52Z",
  "roles": ["user", "admin"],
  "permissions": ["read:profile", "write:profile"],
  "settings": {
    "notifications": true,
    "twoFactorEnabled": false
  },
  "oauthProviders": [
    {
      "provider": "google",
      "providerId": "google-id-123",
      "linkedAt": "2023-04-12T23:20:50.52Z"
    }
  ]
}`}</pre>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          Implementation Considerations
        </h4>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="font-medium text-gray-900 mb-1">
              Security Best Practices
            </div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Hash passwords with bcrypt (cost factor 12+)</li>
              <li>Implement rate limiting on auth endpoints</li>
              <li>Use short-lived JWTs (15 min) with refresh tokens</li>
              <li>Store tokens securely (HTTP-only cookies preferred)</li>
              <li>Implement CSRF protection for cookie-based auth</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="font-medium text-gray-900 mb-1">
              Performance Considerations
            </div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Cache user permissions after authentication</li>
              <li>Use database indexes on frequently queried fields</li>
              <li>Implement connection pooling for database efficiency</li>
              <li>Consider Redis for session store and rate limiting</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="font-medium text-gray-900 mb-1">
              Testing Strategy
            </div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Unit tests for validation and business logic</li>
              <li>Integration tests for API endpoints</li>
              <li>Security testing (penetration testing, OWASP checks)</li>
              <li>Load testing for authentication endpoints</li>
              <li>E2E tests for critical auth flows (login, registration)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <section id="examples" className="scroll-mt-24 my-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          See Trident in Action
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore how Trident creates comprehensive project plans and technical
          guidance for Cursor development, helping you build better software
          faster.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === index
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">{exampleContent[activeTab]}</div>
        </div>
      </div>
    </section>
  );
};

export default ExampleSection;
