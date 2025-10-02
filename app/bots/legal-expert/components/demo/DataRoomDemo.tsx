'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadedFile } from './types';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'lawyer';
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  fileAttachment?: string;
  isTyping?: boolean;
}

interface DataRoomDemoProps {
  files: UploadedFile[];
  lawyerUsername: string;
  lawyerAvatar: string;
}

const DataRoomDemo: React.FC<DataRoomDemoProps> = ({ files, lawyerUsername, lawyerAvatar }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'timeline'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [lawyerOnline, setLawyerOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome messages
  useEffect(() => {
    const welcomeMessages: Message[] = [
      {
        id: '1',
        sender: 'ai',
        senderName: 'Lex AI',
        senderAvatar: '🤖',
        content: 'Welcome to your secure data room! I\'ve analyzed your case and organized all documents. Your lawyer has been notified.',
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: '2',
        sender: 'lawyer',
        senderName: lawyerUsername,
        senderAvatar: lawyerAvatar,
        content: 'Hi! I\'ve reviewed your case documents. I have a few questions about the contract you uploaded. Can we discuss?',
        timestamp: new Date(Date.now() - 60000)
      }
    ];
    setMessages(welcomeMessages);
  }, [lawyerUsername, lawyerAvatar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      senderAvatar: '👤',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI/Lawyer response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: Math.random() > 0.5 ? 'lawyer' : 'ai',
        senderName: Math.random() > 0.5 ? lawyerUsername : 'Lex AI',
        senderAvatar: Math.random() > 0.5 ? lawyerAvatar : '🤖',
        content: getSmartResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const getSmartResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('contract')) {
      return 'I see you\'re asking about the contract. Let me highlight the key clauses that need your attention. Clause 5.2 has some unusual terms we should discuss.';
    }
    if (lower.includes('evidence')) {
      return 'The evidence documents look strong. I\'ve cross-referenced them with similar cases and found 3 precedents that support your position.';
    }
    if (lower.includes('timeline') || lower.includes('when')) {
      return 'Based on the jurisdiction and case type, we\'re looking at 4-6 weeks for initial filing, then 2-3 months for the hearing. I\'ll keep you updated on all deadlines.';
    }
    return 'That\'s a great question. Let me review the relevant documents and case law. I\'ll have a detailed analysis for you within the hour.';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl">
              {lawyerAvatar}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base">{lawyerUsername}</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${lawyerOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-slate-300 text-xs sm:text-sm">
                  {lawyerOnline ? 'Online now' : 'Away'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
              <span className="text-white text-lg">📹</span>
            </button>
            <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
              <span className="text-white text-lg">📞</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          {[
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'files', label: 'Files', icon: '📁', count: files.length },
            { id: 'timeline', label: 'Timeline', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors relative
                ${activeTab === tab.id
                  ? 'text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <span className="mr-1 sm:mr-2">{tab.icon}</span>
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 sm:ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[400px] sm:h-[500px] overflow-y-auto">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${
                    message.sender === 'user' ? 'bg-blue-500' :
                    message.sender === 'lawyer' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    'bg-gradient-to-br from-green-500 to-teal-500'
                  }`}>
                    {message.senderAvatar}
                  </div>
                  <div className={`flex-1 max-w-[80%] sm:max-w-[70%] ${message.sender === 'user' ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-900">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className={`rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                    {lawyerAvatar}
                  </div>
                  <div className="bg-gray-100 rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all active:scale-95"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span className="sm:hidden">📤</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                🔒 End-to-end encrypted · AI + Human lawyer in the loop
              </p>
            </div>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="p-3 sm:p-4">
            {files.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📂</div>
                <p className="text-gray-600">No files uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedFile?.id === file.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{file.category || 'Uncategorized'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg">💬</button>
                        <button className="p-2 hover:bg-blue-100 rounded-lg">📥</button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="p-3 sm:p-4 space-y-4">
            {[
              { time: '2 min ago', event: 'Lawyer joined the data room', icon: '👨‍⚖️', color: 'blue' },
              { time: '5 min ago', event: 'AI analyzed all documents', icon: '🤖', color: 'green' },
              { time: '8 min ago', event: 'Contract.pdf uploaded', icon: '📄', color: 'gray' },
              { time: '10 min ago', event: 'Data room created', icon: '🎉', color: 'purple' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>🔐 Multi-level access · All actions logged</span>
          <span className="hidden sm:inline">Powered by Lex AI</span>
        </div>
      </div>
    </div>
  );
};

export default DataRoomDemo;
