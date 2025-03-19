'use client';

import React from 'react';
import Link from 'next/link';

interface Activity {
  id: string;
  type: 'transaction' | 'law' | 'service' | 'vote';
  action: string;
  item: string;
  time: string;
  path: string;
  taxImpact: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

/**
 * Displays a feed of recent user activities across Solon components
 */
const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === 'transaction' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'law' ? 'bg-amber-100 text-amber-600' :
                      activity.type === 'service' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'transaction' && '💸'}
                      {activity.type === 'law' && '⚖️'}
                      {activity.type === 'service' && '🛠️'}
                      {activity.type === 'vote' && '🗳️'}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <Link 
                          href={{ pathname: activity.path }}
                          className="font-medium text-gray-900 hover:text-green-600"
                        >
                          You {activity.action} {activity.item}
                        </Link>
                      </div>
                      <div className="mt-0.5 flex flex-col sm:flex-row sm:items-center">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <span className="hidden sm:inline mx-1 text-gray-300">•</span>
                        <p className="text-sm font-medium text-green-600">{activity.taxImpact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link 
          href={{ pathname: "#" }}
          className="flex justify-center items-center text-sm text-gray-600 hover:text-gray-900"
        >
          View all activity
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ActivityFeed; 