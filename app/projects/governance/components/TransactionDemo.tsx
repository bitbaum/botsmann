'use client';

import React, { useState } from 'react';

interface TransactionComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: string;
  agency: string;
  recipient: string;
  purpose: string;
  details: string;
  likes: number;
  dislikes: number;
  comments: TransactionComment[];
  shares: number;
}

/**
 * Interactive transaction demo component that allows citizens to
 * engage with government transactions through social features
 */
const TransactionDemo: React.FC = () => {
  // Sample transaction data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TX-2023-06-15-001',
      date: 'June 15, 2023',
      amount: '$249,800',
      agency: 'Department of Transportation',
      recipient: 'Urban Roads Inc.',
      purpose: 'Highway Repair - Section 14A',
      details: 'Emergency repair of damaged highway section including asphalt replacement, line repainting, and drainage improvements.',
      likes: 87,
      dislikes: 21,
      comments: [
        {
          id: 'c1',
          author: 'Jane Citizen',
          text: 'This repair was desperately needed. The potholes were damaging vehicles.',
          timestamp: '2 days ago'
        },
        {
          id: 'c2',
          author: 'Mark Taxpayer',
          text: 'I drive on this section daily and can confirm the work has been completed.',
          timestamp: '1 day ago'
        }
      ],
      shares: 18
    },
    {
      id: 'TX-2023-06-10-014',
      date: 'June 10, 2023',
      amount: '$56,750',
      agency: 'Parks & Recreation',
      recipient: 'Green Spaces Landscaping',
      purpose: 'Community Park Maintenance',
      details: 'Quarterly maintenance of Central Community Park including lawn care, tree pruning, playground equipment inspection, and irrigation system maintenance.',
      likes: 134,
      dislikes: 8,
      comments: [
        {
          id: 'c3',
          author: 'Parent Council',
          text: 'The playground looks much better now. Thank you!',
          timestamp: '3 days ago'
        }
      ],
      shares: 42
    },
    {
      id: 'TX-2023-06-05-078',
      date: 'June 5, 2023',
      amount: '$1,250,000',
      agency: 'Education Department',
      recipient: 'LearnTech Solutions',
      purpose: 'School District Technology Upgrade',
      details: 'Purchase of 500 laptops, 50 interactive whiteboards, and supporting infrastructure for the Western School District technology modernization initiative.',
      likes: 201,
      dislikes: 115,
      comments: [
        {
          id: 'c4',
          author: 'Tech Teacher',
          text: 'Our school received the new equipment last week. Game changer for our STEM program!',
          timestamp: '5 days ago'
        },
        {
          id: 'c5',
          author: 'Fiscal Watch',
          text: 'Why are we spending so much on technology that will be outdated in 3 years?',
          timestamp: '4 days ago'
        },
        {
          id: 'c6',
          author: 'Education Board',
          text: 'These devices come with a 5-year support contract and are critical for student success.',
          timestamp: '3 days ago'
        }
      ],
      shares: 67
    }
  ]);

  // State for comment input
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  // Handle user actions (like, dislike, share)
  const handleAction = (id: string, action: 'like' | 'dislike' | 'share') => {
    setTransactions(prev => 
      prev.map(tx => 
        tx.id === id 
          ? {
              ...tx,
              likes: action === 'like' ? tx.likes + 1 : tx.likes,
              dislikes: action === 'dislike' ? tx.dislikes + 1 : tx.dislikes,
              shares: action === 'share' ? tx.shares + 1 : tx.shares
            }
          : tx
      )
    );
  };

  // Handle comment submission
  const handleCommentSubmit = (id: string) => {
    if (!commentInputs[id] || commentInputs[id].trim() === '') return;

    const newComment: TransactionComment = {
      id: `c${Math.random().toString(36).substr(2, 9)}`,
      author: 'You',
      text: commentInputs[id],
      timestamp: 'Just now'
    };

    setTransactions(prev => 
      prev.map(tx => 
        tx.id === id 
          ? { ...tx, comments: [...tx.comments, newComment] }
          : tx
      )
    );

    // Reset input
    setCommentInputs(prev => ({ ...prev, [id]: '' }));
  };

  // Toggle comments visibility
  const toggleComments = (id: string) => {
    setShowComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle donation
  const handleDonate = (id: string, target: 'agency' | 'recipient') => {
    const transaction = transactions.find(tx => tx.id === id);
    if (!transaction) return;

    const entity = target === 'agency' ? transaction.agency : transaction.recipient;
    alert(`Thank you for supporting ${entity}! This would open a donation form in a real implementation.`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Open Payments Explorer</h2>
      <p className="text-gray-600">
        Explore and engage with government transactions. Your participation helps ensure transparency and accountability.
      </p>
      
      {transactions.map(transaction => (
        <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Transaction header */}
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
                  {transaction.id}
                </span>
                <h3 className="text-lg font-medium text-gray-900">{transaction.purpose}</h3>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">{transaction.amount}</p>
              </div>
            </div>
          </div>
          
          {/* Transaction details */}
          <div className="px-6 py-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">From:</span>
                  <span className="font-medium">{transaction.agency}</span>
                </div>
                <button 
                  onClick={() => handleDonate(transaction.id, 'agency')}
                  className="text-xs bg-green-100 hover:bg-green-200 text-green-800 font-medium px-2.5 py-0.5 rounded transition-colors"
                >
                  Donate to Agency
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">To:</span>
                  <span className="font-medium">{transaction.recipient}</span>
                </div>
                <button 
                  onClick={() => handleDonate(transaction.id, 'recipient')}
                  className="text-xs bg-green-100 hover:bg-green-200 text-green-800 font-medium px-2.5 py-0.5 rounded transition-colors"
                >
                  Donate to Recipient
                </button>
              </div>
              
              <p className="text-sm text-gray-600 pt-2">
                {transaction.details}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <button 
                onClick={() => handleAction(transaction.id, 'like')}
                className="inline-flex items-center text-sm text-gray-700 hover:text-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Like</span>
                <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                  {transaction.likes}
                </span>
              </button>
              
              <button 
                onClick={() => handleAction(transaction.id, 'dislike')}
                className="inline-flex items-center text-sm text-gray-700 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                <span>Dislike</span>
                <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                  {transaction.dislikes}
                </span>
              </button>
              
              <button 
                onClick={() => toggleComments(transaction.id)}
                className="inline-flex items-center text-sm text-gray-700 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Comments</span>
                <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                  {transaction.comments.length}
                </span>
              </button>
              
              <button 
                onClick={() => handleAction(transaction.id, 'share')}
                className="inline-flex items-center text-sm text-gray-700 hover:text-purple-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
                <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                  {transaction.shares}
                </span>
              </button>
            </div>
            
            {/* Comments section */}
            {showComments[transaction.id] && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h4 className="font-medium text-sm text-gray-700 mb-3">Comments</h4>
                
                {/* Comment list */}
                <div className="space-y-3 mb-4">
                  {transaction.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
                
                {/* Comment input */}
                <div className="flex">
                  <input
                    type="text"
                    value={commentInputs[transaction.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [transaction.id]: e.target.value }))}
                    className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add your comment..."
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(transaction.id)}
                  />
                  <button
                    onClick={() => handleCommentSubmit(transaction.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionDemo; 