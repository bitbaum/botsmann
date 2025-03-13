'use client';
import { useState, useEffect, useRef } from 'react';

interface TextGeneratorProps {
  getTryLink: () => string;
}

export default function TextGenerator({ getTryLink }: TextGeneratorProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [conversation, setConversation] = useState<{type: 'user' | 'contact' | 'bot', text: string, time?: string}[]>([
    {type: 'contact', text: 'Sali! Hesch lust hüt abig öppis z\'esse?', time: '19:30'}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examples = [
    "What does this mean?",
    "Reschedule plans",
    "Invite to event"
  ];

  const handleExampleClick = (example: string) => {
    setInputMessage('');
    setActiveExample(example);
    
    if (example === "What does this mean?") {
      setConversation([
        {type: 'contact', text: 'Sali! Hesch lust hüt abig öppis z\'esse?', time: '19:30'},
        {type: 'user', text: 'I don\'t understand. What does this mean?', time: '19:45'}
      ]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setConversation(prev => [
          ...prev,
          {
            type: 'bot',
            text: `This message is saying: "Hi! Do you want to get something to eat tonight?"

Key phrases:
• "Sali" = casual greeting (Hi/Hey)
• "Hesch lust" = "do you feel like" / "do you want to"
• "hüt abig" = "tonight" (literally "today evening")
• "öppis z'esse" = "something to eat"

A natural response would be:
"Sali! Ja gern, wo wotsch go? 😊"`,
            time: '19:46'
          }
        ]);
      }, 1500);
    } else if (example === "Reschedule plans") {
      setConversation([
        {type: 'contact', text: 'Treffe mer üs morn am Bahnhof um 18:00?', time: '14:22'},
      ]);
    } else if (example === "Invite to event") {
      setConversation([]);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      type: 'user' as const,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setConversation(prev => [...prev, newMessage]);
    setInputMessage('');
    
    if (activeExample === "What does this mean?") {
      setConversation(prev => [
        ...prev,
        {type: 'user', text: 'Sali! Ja gern, wo wotsch go? 😊', time: '19:47'}
      ]);
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {type: 'contact', text: 'Super! Villicht ins Hiltl? Um 20:30?', time: '19:50'}
        ]);
      }, 1500);
    } else if (activeExample === "Reschedule plans") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setConversation(prev => [
          ...prev,
          {
            type: 'bot',
            text: `If you need to reschedule, you could respond with:

"Es tuet mer leid, aber ich chan morn um 18:00 nöd. Giengs au am 19:30? Oder villicht am Donnschtig?"

This means:
"I'm sorry, but I can't make it tomorrow at 18:00. Would 19:30 work? Or perhaps on Thursday?"

The key Swiss German phrases here are:
• "Es tuet mer leid" = "I'm sorry"
• "ich chan nöd" = "I can't"
• "Giengs au" = "Would it also work"
• "Donnschtig" = "Thursday"`,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        ]);
      }, 1500);
    } else if (activeExample === "Invite to event") {
      setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setConversation(prev => [
          ...prev,
          {
            type: 'bot',
            text: `To invite someone to an event, you could write:

"Sali! Es git am Samschtig es Konzert im Kaufleuten. Hesch Lust mitzko? Aafang isch um 20:00."

This means:
"Hi! There's a concert at Kaufleuten on Saturday. Would you like to come along? It starts at 20:00."

The key Swiss German phrases are:
• "Es git" = "There is/There's"
• "Samschtig" = "Saturday"
• "Hesch Lust mitzko?" = "Would you like to come along?"
• "Aafang isch um" = "It starts at"`,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        ]);
      }, 1500);
    }
  };

  // Auto-scroll to the bottom when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="max-w-md mx-auto border rounded-lg overflow-hidden shadow-sm">
      {/* Phone-like interface */}
      <div className="bg-gray-800 text-white text-center py-2 text-sm">
        <div className="flex justify-between px-4 items-center">
          <span>20:15</span>
          <div className="flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-.7a2.5 2.5 0 014.9 0H16a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
          </div>
        </div>
        </div>
      
      {/* Chat interface */}
      <div className="bg-gray-100 p-3 h-96 overflow-y-auto flex flex-col space-y-3">
        <div className="text-center text-xs text-gray-500 my-2">Today</div>
        
        {conversation.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`rounded-lg py-2 px-3 max-w-[75%] shadow-sm ${
                msg.type === 'user' 
                  ? 'bg-green-500 text-white' 
                  : msg.type === 'bot'
                    ? 'bg-white text-gray-800 border border-gray-200'
                    : 'bg-white text-gray-800'
              }`}
            >
              {msg.type === 'bot' && <p className="text-gray-800 font-medium">Heidi Bot:</p>}
              <p className={msg.type === 'bot' ? 'whitespace-pre-line' : ''}>{msg.text}</p>
              {msg.time && (
                <p className={`text-xs mt-1 text-right ${
                  msg.type === 'user' ? 'text-green-200' : 'text-gray-500'
                }`}>
                  {msg.time}
          </p>
        )}
      </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg py-2 px-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t p-3">
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1">Try one of these scenarios:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map(example => (
              <button 
                key={example}
                onClick={() => handleExampleClick(example)}
                className={`text-xs ${activeExample === example ? 'bg-green-100 text-green-800' : 'bg-gray-100 hover:bg-gray-200'} rounded-full px-2 py-1 transition-colors`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        
        {/* Message input */}
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message or paste Swiss German..."
            className="flex-grow p-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
          <a 
            href={getTryLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 