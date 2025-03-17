import React from 'react';
import { btnPrimary } from '../../utils/constants';

interface ConversationPracticeProps {
  getTryLink: () => string;
}

const ConversationPractice = ({ getTryLink }: ConversationPracticeProps) => {
  const conversations = [
    {
      situation: "Ordering coffee",
      standard: "Ich hätte gerne einen Kaffee, bitte.",
      swiss: "Ich hett gern en Kafi, bitte.",
      translation: "I would like a coffee, please."
    },
    {
      situation: "Asking for the bill",
      standard: "Die Rechnung, bitte.",
      swiss: "D'Rächnig, bitte.",
      translation: "The bill, please."
    }
  ];

  return (
    <div className="space-y-6">
      {conversations.map((convo, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <p className="font-medium text-gray-700">{convo.situation}</p>
          </div>
          <div className="px-4 py-3">
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">Standard German:</p>
              <p className="text-gray-700">{convo.standard}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">Swiss German:</p>
              <p className="text-gray-800 font-medium">{convo.swiss}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">English:</p>
              <p className="text-gray-700">{convo.translation}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">Practice conversations</h4>
        <p className="text-sm text-gray-600 mb-3">
          Simulate real-life conversations in Swiss German. Heidi will play different roles and help you practice.
        </p>
        <div className="flex justify-center">
          <a 
            href={`${getTryLink()}?q=Let's%20practice%20a%20conversation%20in%20Swiss%20German%20for%20ordering%20at%20a%20restaurant`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={btnPrimary}
          >
            Start Conversation Practice
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConversationPractice; 