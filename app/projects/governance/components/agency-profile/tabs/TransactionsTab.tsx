'use client';

import React from 'react';
import Link from 'next/link';
import { EnhancedTransaction } from '../../TransactionWithTraceability';
import { formatCurrency, getStatusColor } from '../types';

interface TransactionsTabProps {
  transactions: EnhancedTransaction[];
}

export const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions }) => (
  <div>
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link
              href={{
                pathname: '/projects/governance/open-pay/[id]',
                query: { id: transaction.id },
              }}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {transaction.description}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          transaction.status,
                        )}`}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 font-medium">
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      To: {transaction.recipient}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>{transaction.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
