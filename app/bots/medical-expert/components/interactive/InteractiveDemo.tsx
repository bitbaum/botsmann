import React, { useState } from 'react';

interface InteractiveDemoProps {
  getTryLink: () => string;
}

/**
 * Interactive Demo Component
 * 
 * Interactive demo component that simulates a conversation with Imhotep
 * by providing sample questions and displaying answers. It allows users 
 * to see how Imhotep responds before being directed to the full experience.
 * 
 * @module InteractiveDemo
 */
const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ getTryLink }) => {
  const [inputType, setInputType] = useState<'text' | 'condition'>('condition');
  const [question, setQuestion] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot', message: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Common conditions users might want to explore
  const commonConditions = [
    'High Blood Pressure', 
    'Type 2 Diabetes', 
    'Anxiety', 
    'Depression',
    'Insomnia',
    'Back Pain',
    'Migraine',
    'Allergies'
  ];
  
  // Simulate sending a message and getting a response
  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { sender: 'user', message }]);
    setIsLoading(true);
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      let response = '';
      
      // Generate appropriate response based on condition or question
      if (selectedCondition) {
        response = `${selectedCondition} is a common condition that affects many people. I can provide evidence-based information about symptoms, treatments, and management strategies. Would you like to know more about prevention, symptoms, or treatment options?`;
      } else if (message.toLowerCase().includes('diabetes')) {
        response = 'Diabetes is a condition where your body has trouble regulating blood sugar. Type 2 diabetes is most common and often related to lifestyle factors. Would you like to learn about prevention, management, or potential complications?';
      } else if (message.toLowerCase().includes('anxiety') || message.toLowerCase().includes('stress')) {
        response = 'Anxiety is a natural response to stress, but can become problematic when excessive. Evidence shows that cognitive behavioral therapy, mindfulness, and sometimes medication can be effective treatments. Would you like to know more about coping strategies?';
      } else {
        response = `That's an important health question. I can provide evidence-based information about this topic based on medical research. For a more detailed conversation, I'd recommend continuing our chat on the full Imhotep platform.`;
      }
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { sender: 'bot', message: response }]);
      setIsLoading(false);
      setQuestion('');
      setSelectedCondition('');
    }, 1500);
  };
  
  // Handle condition selection
  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
    sendMessage(`I'd like to learn about ${condition}`);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(question);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Chat history */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          {chatHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="mb-2">Select a health condition below or ask a question to start a conversation.</p>
              <p>Imhotep will provide evidence-based health information.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3/4 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex mb-3">
            <button 
              onClick={() => setInputType('condition')} 
              className={`flex-1 py-2 text-center ${inputType === 'condition' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-600'} rounded-l-lg`}
            >
              Select Condition
            </button>
            <button 
              onClick={() => setInputType('text')} 
              className={`flex-1 py-2 text-center ${inputType === 'text' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100 text-gray-600'} rounded-r-lg`}
            >
              Ask Question
            </button>
          </div>
          
          {inputType === 'condition' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {commonConditions.map(condition => (
                <button
                  key={condition}
                  onClick={() => handleConditionSelect(condition)}
                  className="py-2 px-3 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  {condition}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your health question..."
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!question.trim() || isLoading}
                  className="px-4 bg-green-600 text-white rounded-r-lg disabled:bg-green-400"
                >
                  Send
                </button>
              </div>
            </form>
          )}
          
          {chatHistory.length > 0 && (
            <div className="text-center">
              <a 
                href={getTryLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Chat with Imhotep
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo; 