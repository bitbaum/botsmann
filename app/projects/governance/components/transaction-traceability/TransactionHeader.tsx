'use client';

import React from 'react';
import { EnhancedTransaction, formatCurrency, getStatusColor } from './types';

interface TransactionHeaderProps {
  transaction: EnhancedTransaction;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ transaction }) => (
  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">{transaction.description}</h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Transaction ID: {transaction.id} | Date: {transaction.date}
        </p>
      </div>
      <div className="mt-3 md:mt-0 flex items-center">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
        >
          {transaction.status}
        </span>
        <span className="ml-3 text-lg font-bold text-gray-900">
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </div>
  </div>
);
