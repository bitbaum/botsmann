'use client';

import React, { useState, useEffect } from 'react';
import { UploadedFile, LawyerProfile } from './types';
import { FILE_CATEGORIES } from './constants';

interface WorkspaceDashboardProps {
  files: UploadedFile[];
  lawyer: LawyerProfile;
  caseDescription: string;
  onClose: () => void;
  onFileUpload: (files: UploadedFile[]) => void;
  onFileDelete: (fileId: string) => void;
  onFileVisibilityChange: (fileId: string, visibility: string) => void;
}

type ViewMode = 'overview' | 'files' | 'chat' | 'timeline' | 'settings';

const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({
  files,
  lawyer,
  caseDescription,
  onClose,
  onFileUpload,
  onFileDelete,
  onFileVisibilityChange
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 50);
  }, []);

  // Initial welcome messages
  useEffect(() => {
    const welcomeMessages = [
      {
        id: '1',
        sender: 'ai',
        senderName: 'Lex AI',
        avatar: '🤖',
        content: `Welcome to your secure data room! I've analyzed your case and organized ${files.length} files. How can I help you today?`,
        timestamp: new Date()
      },
      {
        id: '2',
        sender: 'lawyer',
        senderName: lawyer.username,
        avatar: lawyer.avatar,
        content: `Hi! I'm ${lawyer.username}, your assigned attorney. I've reviewed your case and I'm here to assist. Feel free to ask me anything.`,
        timestamp: new Date()
      }
    ];
    setMessages(welcomeMessages);
  }, [lawyer, files.length]);

  // File categories with counts
  const categoriesWithFiles = FILE_CATEGORIES.map(cat => ({
    ...cat,
    files: files.filter(f => f.category === cat.id),
    count: files.filter(f => f.category === cat.id).length
  })).filter(cat => cat.count > 0);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadedFile[] = droppedFiles.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      name: file.name,
      type: file.type,
      size: file.size,
      category: 'other',
      status: 'uploading' as const,
      visibility: 'private'
    }));

    // Simulate upload
    newFiles.forEach((file, idx) => {
      setTimeout(() => {
        file.status = 'completed';
        onFileUpload([file]);
      }, 1000 * (idx + 1));
    });
  };

  // Send message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      avatar: '👤',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        senderName: 'Lex AI',
        avatar: '🤖',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-700 ${
        showAnimation ? 'opacity-100' : 'opacity-0'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  L
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Lex Workspace</h1>
                  <p className="text-xs text-slate-400">Private Data Room • End-to-End Encrypted</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Lawyer info */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-2xl">{lawyer.avatar}</span>
                <div>
                  <p className="text-sm font-medium text-white">{lawyer.username}</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                title="Exit Workspace"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative h-[calc(100vh-80px)] flex">
        {/* Sidebar Navigation */}
        <aside className="w-20 lg:w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700 flex flex-col">
          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'overview', icon: '🏠', label: 'Overview' },
              { id: 'files', icon: '📁', label: 'Files', badge: files.length },
              { id: 'chat', icon: '💬', label: 'Chat', badge: messages.length },
              { id: 'timeline', icon: '📅', label: 'Timeline' },
              { id: 'settings', icon: '⚙️', label: 'Settings' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setViewMode(item.id as ViewMode)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  viewMode === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden lg:block font-medium">{item.label}</span>
                {item.badge && (
                  <span className="hidden lg:block ml-auto bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="hidden lg:block p-4 border-t border-slate-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Files</span>
                <span className="text-white font-bold">{files.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Messages</span>
                <span className="text-white font-bold">{messages.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Storage</span>
                <span className="text-white font-bold">{formatTotalSize(files)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main View */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {viewMode === 'overview' && (
            <OverviewView
              files={files}
              categoriesWithFiles={categoriesWithFiles}
              caseDescription={caseDescription}
              setViewMode={setViewMode}
            />
          )}

          {viewMode === 'files' && (
            <FilesView
              files={files}
              categoriesWithFiles={categoriesWithFiles}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              onFileDelete={onFileDelete}
              onFileVisibilityChange={onFileVisibilityChange}
            />
          )}

          {viewMode === 'chat' && (
            <ChatView
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isTyping={isTyping}
              lawyer={lawyer}
            />
          )}

          {viewMode === 'timeline' && (
            <TimelineView files={files} messages={messages} />
          )}

          {viewMode === 'settings' && (
            <SettingsView lawyer={lawyer} />
          )}
        </main>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-50 border-4 border-dashed border-blue-400">
          <div className="text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-2xl font-bold text-white">Drop files to upload</p>
            <p className="text-slate-300 mt-2">Files will be automatically categorized</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Overview View Component
const OverviewView: React.FC<any> = ({ files, categoriesWithFiles, caseDescription, setViewMode }) => (
  <div className="space-y-6 animate-fadeIn">
    {/* Welcome banner */}
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome to Your Data Room 🚀</h2>
      <p className="text-blue-100">Your secure collaborative workspace is ready. All files are encrypted end-to-end.</p>
    </div>

    {/* Case summary */}
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">📋 Case Summary</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{caseDescription}</p>
    </div>

    {/* Quick actions */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: '📁', title: 'Files', count: files.length, color: 'from-blue-500 to-cyan-500', view: 'files' },
        { icon: '💬', title: 'Chat', count: '24/7', color: 'from-purple-500 to-pink-500', view: 'chat' },
        { icon: '📅', title: 'Timeline', count: 'Live', color: 'from-green-500 to-emerald-500', view: 'timeline' },
        { icon: '⚙️', title: 'Settings', count: 'Manage', color: 'from-orange-500 to-red-500', view: 'settings' }
      ].map((action) => (
        <button
          key={action.title}
          onClick={() => setViewMode(action.view)}
          className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:scale-105 group"
        >
          <div className={`text-4xl mb-3 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}>
            {action.icon}
          </div>
          <h4 className="text-white font-bold mb-1">{action.title}</h4>
          <p className="text-slate-400 text-sm">{action.count}</p>
        </button>
      ))}
    </div>

    {/* File categories preview */}
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-4">📂 File Categories</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categoriesWithFiles.map((cat) => (
          <div key={cat.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">{cat.count}</span>
            </div>
            <p className="text-sm text-white font-medium">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Files View Component
const FilesView: React.FC<any> = ({
  files,
  categoriesWithFiles,
  selectedFile,
  setSelectedFile,
  onFileDelete,
  onFileVisibilityChange
}) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">📁 File Management</h2>
      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
        + Upload Files
      </button>
    </div>

    {categoriesWithFiles.map((category) => (
      <div key={category.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-bold text-white">{category.title}</h3>
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                {category.count} files
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {category.files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                selectedFile === file.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-slate-900/30 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-3xl">📄</div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{file.name}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-slate-400">{formatFileSize(file.size)}</span>
                  <select
                    value={file.visibility || 'private'}
                    onChange={(e) => onFileVisibilityChange(file.id, e.target.value)}
                    className="text-xs bg-slate-700 text-white px-2 py-1 rounded border border-slate-600"
                  >
                    <option value="private">🔒 Private</option>
                    <option value="lawyer">👨‍⚖️ Lawyer Only</option>
                    <option value="team">👥 Team</option>
                    <option value="public">🌐 Public</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFile(file.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  👁️
                </button>
                <button
                  onClick={() => onFileDelete(file.id)}
                  className="p-2 hover:bg-red-600/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Chat View Component
const ChatView: React.FC<any> = ({ messages, inputMessage, setInputMessage, handleSendMessage, isTyping, lawyer }) => (
  <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700">
    <div className="px-6 py-4 border-b border-slate-700">
      <h2 className="text-xl font-bold text-white">💬 Live Chat</h2>
      <p className="text-sm text-slate-400">AI + {lawyer.username} • No appointments needed</p>
    </div>

    <div className="flex-1 overflow-auto p-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
          {msg.sender !== 'user' && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
              {msg.avatar}
            </div>
          )}
          <div className={`max-w-md ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-slate-700'} rounded-2xl px-4 py-3`}>
            <p className="text-xs text-slate-300 mb-1">{msg.senderName}</p>
            <p className="text-white text-sm">{msg.content}</p>
            <p className="text-xs text-slate-400 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            🤖
          </div>
          <div className="bg-slate-700 rounded-2xl px-4 py-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="p-4 border-t border-slate-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask AI or your lawyer anything..."
          className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

// Timeline View Component
const TimelineView: React.FC<any> = ({ files, messages }) => (
  <div className="space-y-4 animate-fadeIn">
    <h2 className="text-2xl font-bold text-white">📅 Activity Timeline</h2>
    <div className="space-y-3">
      {[...messages, ...files].sort((a, b) =>
        new Date(b.timestamp || Date.now()).getTime() - new Date(a.timestamp || Date.now()).getTime()
      ).slice(0, 20).map((item, idx) => (
        <div key={idx} className="flex gap-4 bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700">
          <div className="text-2xl">{'content' in item ? '💬' : '📄'}</div>
          <div className="flex-1">
            <p className="text-white font-medium">
              {'content' in item ? `Message from ${item.senderName}` : `File uploaded: ${item.name}`}
            </p>
            <p className="text-sm text-slate-400">
              {new Date(item.timestamp || Date.now()).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Settings View Component
const SettingsView: React.FC<any> = ({ lawyer }) => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-2xl font-bold text-white">⚙️ Workspace Settings</h2>

    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-4">🔐 Privacy & Access Control</h3>
      <div className="space-y-4">
        {[
          { role: 'Owner (You)', access: 'Full Access', icon: '👤' },
          { role: `Attorney (${lawyer.username})`, access: 'Full Access', icon: lawyer.avatar },
          { role: 'Paralegal', access: 'Limited Access', icon: '📝' },
          { role: 'Advisor', access: 'Read Only', icon: '👥' }
        ].map((member) => (
          <div key={member.role} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{member.icon}</span>
              <div>
                <p className="text-white font-medium">{member.role}</p>
                <p className="text-sm text-slate-400">{member.access}</p>
              </div>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">Edit</button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-4">🔔 Notifications</h3>
      <div className="space-y-3">
        {[
          { label: 'Email notifications', enabled: true },
          { label: 'Push notifications', enabled: true },
          { label: 'SMS alerts', enabled: false }
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
            <span className="text-white">{setting.label}</span>
            <div className={`w-12 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${setting.enabled ? 'ml-6' : 'ml-0.5'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatTotalSize(files: UploadedFile[]): string {
  const total = files.reduce((acc, f) => acc + f.size, 0);
  return formatFileSize(total);
}

function getAIResponse(message: string): string {
  const responses: Record<string, string> = {
    'help': 'I can help you with document analysis, legal research, deadline tracking, and more. What do you need?',
    'file': 'I\'ve analyzed all your files and organized them into categories. Would you like me to explain any specific document?',
    'deadline': 'Based on your case, I\'ve identified several important deadlines. Would you like me to set up reminders?',
    'default': 'I understand your question. Let me analyze your case files and provide you with a detailed answer. Your lawyer will also be notified if this requires expert legal advice.'
  };

  const lowerMsg = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMsg.includes(key)) return response;
  }
  return responses.default;
}

export default WorkspaceDashboard;
