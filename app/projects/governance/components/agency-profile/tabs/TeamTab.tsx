'use client';

import React from 'react';
import Link from 'next/link';
import { AgencyTeamMember, getTransparencyColor } from '../types';

interface TeamTabProps {
  team: AgencyTeamMember[];
}

export const TeamTab: React.FC<TeamTabProps> = ({ team }) => (
  <div>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {team.map((member) => (
        <li
          key={member.id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <div className="w-24 h-24 flex-shrink-0 mx-auto rounded-full bg-gray-200 overflow-hidden">
              {member.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element -- Dynamic external image URL from data */
                <img className="w-24 h-24 object-cover" src={member.imageUrl} alt={member.name} />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500 text-2xl">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{member.name}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Position</dt>
              <dd className="text-gray-500 text-sm">{member.position}</dd>
              <dt className="sr-only">Department</dt>
              <dd className="text-gray-500 text-xs">{member.department}</dd>
              <dd className="mt-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getTransparencyColor(
                    member.transparency,
                  )}`}
                >
                  T-Score: {member.transparency}/100
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <Link
                  href={{
                    pathname: '/projects/governance/employees/[id]',
                    query: { id: member.id },
                  }}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <span className="ml-3">View Profile</span>
                </Link>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                {member.contact.email && (
                  <a
                    href={`mailto:${member.contact.email}`}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <span className="ml-3">Contact</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
