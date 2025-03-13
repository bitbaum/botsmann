'use client';
import { useState, useEffect, useRef } from 'react';

interface EmailGeneratorProps {
  getTryLink: () => string;
}

export default function EmailGenerator({ getTryLink }: EmailGeneratorProps) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const examples = [
    "Request time off work",
    "Schedule apartment viewing",
    "Thank professor for letter"
  ];

  const handleExampleClick = (example: string) => {
    setInputPrompt(example);
    setActiveExample(example);
  };

  const handleSubmit = () => {
    if (!inputPrompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowResponse(true);
    }, 1200);
  };

  useEffect(() => {
    if (showResponse && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResponse]);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      {/* Email client header */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <span className="text-green-700 font-medium">H</span>
          </div>
          <span className="font-medium">Heidi - Email Assistant</span>
        </div>
      </div>
      
      {/* Conversation area */}
      <div className="bg-white p-4 h-80 overflow-y-auto flex flex-col space-y-4">
        {/* User request */}
        {inputPrompt && (
          <div className="flex justify-end">
            <div className="bg-blue-50 rounded-lg py-2 px-4 max-w-[80%]">
              <p className="text-gray-800">I need to write a professional email to {inputPrompt.toLowerCase()}.</p>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isGenerating && (
          <div className="flex">
            <div className="bg-gray-100 rounded-lg py-3 px-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Bot response */}
        {showResponse && (
          <div className="flex" ref={responseRef}>
            <div className="bg-gray-100 rounded-lg py-3 px-4 max-w-[80%]">
              {activeExample === "Request time off work" ? (
                <>
                  <p className="font-medium text-gray-800 mb-2">Here's a professional email in High German:</p>
                  <div className="bg-white border rounded-md p-3 mb-3">
                    <p className="mb-1"><strong>Betreff:</strong> Urlaubsantrag für [DATUM]</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Sehr geehrte(r) [Name],</p>
                    <p className="my-2">Hiermit beantrage ich Urlaub vom [Startdatum] bis zum [Enddatum]. In dieser Zeit werden meine Aufgaben von [Kollege/Kollegin] übernommen.</p>
                    <p className="my-2">Bei Fragen stehe ich Ihnen gerne zur Verfügung.</p>
                    <p className="my-2">Mit freundlichen Grüßen,</p>
                    <p>[Ihr Name]</p>
                  </div>
                  
                  <p className="font-medium text-gray-800 mb-2">And here's a more Swiss German style:</p>
                  <div className="bg-white border rounded-md p-3">
                    <p className="mb-1"><strong>Betreff:</strong> Ferieaatrag für [DATUM]</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Grüezi [Name],</p>
                    <p className="my-2">Ich möcht gern Ferie neh vom [Startdatum] bis [Enddatum]. Während minere Abweseheit wird [Kollege/Kollegin] mini Ufgabe überneh.</p>
                    <p className="my-2">Falls Sie Frage händ, dörfed Sie mich gern kontaktiere.</p>
                    <p className="my-2">Freundlichi Grüess,</p>
                    <p>[Ihre Name]</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">Notice how the Swiss version uses "Grüezi" instead of "Sehr geehrte" and "Freundlichi Grüess" instead of "Mit freundlichen Grüßen." These small changes make your email sound authentically Swiss!</p>
                </>
              ) : activeExample === "Schedule apartment viewing" ? (
                <>
                  <p className="font-medium text-gray-800 mb-2">Here's a professional email in High German:</p>
                  <div className="bg-white border rounded-md p-3 mb-3">
                    <p className="mb-1"><strong>Betreff:</strong> Terminanfrage für Wohnungsbesichtigung</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Sehr geehrte(r) Herr/Frau [Nachname],</p>
                    <p className="my-2">Mit Interesse habe ich Ihr Inserat für die Wohnung in [Adresse] gesehen. Ich würde die Wohnung gerne besichtigen und frage an, ob am [Datum] um [Uhrzeit] ein Termin möglich wäre.</p>
                    <p className="my-2">Vielen Dank im Voraus für Ihre Rückmeldung.</p>
                    <p className="my-2">Mit freundlichen Grüßen,</p>
                    <p>[Ihr Name]</p>
                  </div>
                  
                  <p className="font-medium text-gray-800 mb-2">And here's a more Swiss German style:</p>
                  <div className="bg-white border rounded-md p-3">
                    <p className="mb-1"><strong>Betreff:</strong> Termin für Wohnigsbsichtigung</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Grüezi Herr/Frau [Nachname],</p>
                    <p className="my-2">Ich ha Ihri Aazeig für d'Wohnig an de [Adresse] gseh und bin sehr interessiert. Chönnt ich d'Wohnig am [Datum] um [Ziit] bsichtige?</p>
                    <p className="my-2">Merci villmal für Ihri Rückmäldig.</p>
                    <p className="my-2">Freundlichi Grüess,</p>
                    <p>[Ihre Name]</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">The Swiss version uses "Wohnig" instead of "Wohnung" and "Merci villmal" instead of "Vielen Dank" - these Swiss German phrases will make you sound more like a local!</p>
                </>
              ) : activeExample === "Thank professor for letter" ? (
                <>
                  <p className="font-medium text-gray-800 mb-2">Here's a professional email in High German:</p>
                  <div className="bg-white border rounded-md p-3 mb-3">
                    <p className="mb-1"><strong>Betreff:</strong> Dank für das Empfehlungsschreiben</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Sehr geehrte(r) Professor(in) [Nachname],</p>
                    <p className="my-2">Herzlichen Dank für das Empfehlungsschreiben, das Sie für mich verfasst haben. Ich weiß Ihre Unterstützung für meine [Bewerbung/Zukunftspläne] sehr zu schätzen.</p>
                    <p className="my-2">Ich halte Sie gerne über den weiteren Verlauf auf dem Laufenden.</p>
                    <p className="my-2">Mit freundlichen Grüßen,</p>
                    <p>[Ihr Name]</p>
                  </div>
                  
                  <p className="font-medium text-gray-800 mb-2">And here's a more Swiss German style:</p>
                  <div className="bg-white border rounded-md p-3">
                    <p className="mb-1"><strong>Betreff:</strong> Danke für s'Empfehligsschribe</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Grüezi Professor(in) [Nachname],</p>
                    <p className="my-2">Ich möcht mich ganz herzlich bedanke für s'Empfehligsschribe, wo Sie für mich gschribe händ. Ich schätze Ihri Understützig für mini [Bewervig/Zukunftspläne] sehr.</p>
                    <p className="my-2">Ich informiere Sie gern, wie's wiitergoht.</p>
                    <p className="my-2">Freundlichi Grüess,</p>
                    <p>[Ihre Name]</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">Note how the Swiss German version uses "wo" instead of "das" when referring to the letter, and "gschribe händ" instead of "verfasst haben" - these dialectal differences show your familiarity with Swiss German!</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-800 mb-2">Here's a professional email in High German:</p>
                  <div className="bg-white border rounded-md p-3 mb-3">
                    <p className="mb-1"><strong>Betreff:</strong> [Your subject here]</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Sehr geehrte Damen und Herren,</p>
                    <p className="my-2">[Your professional email content in High German]</p>
                    <p className="my-2">Mit freundlichen Grüßen,</p>
                    <p>[Ihr Name]</p>
        </div>
                  
                  <p className="font-medium text-gray-800 mb-2">And here's how locals might write it in Swiss German:</p>
                  <div className="bg-white border rounded-md p-3">
                    <p className="mb-1"><strong>Betreff:</strong> [Your subject here]</p>
                    <p className="mb-2"><strong>Email:</strong></p>
                    <p>Grüezi</p>
                    <p className="my-2">[Your email content in Swiss German style]</p>
                    <p className="my-2">Freundlichi Grüess,</p>
                    <p>[Ihre Name]</p>
        </div>
                  
                  <p className="text-sm text-gray-600 mt-3">I've provided both formal High German and Swiss German versions. Notice how the Swiss German uses "Grüezi" and "Freundlichi Grüess" - these small cultural touches make your email sound more local.</p>
                </>
        )}
      </div>
        </div>
      )}
      </div>
      
      {/* Input area with examples */}
      <div className="border-t p-4 bg-white">
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">Try one of these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map(example => (
              <button 
                key={example}
                onClick={() => handleExampleClick(example)}
                className={`text-xs ${activeExample === example ? 'bg-green-100 text-green-800' : 'bg-gray-100 hover:bg-gray-200'} rounded-full px-3 py-1 transition-colors`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input field */}
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Describe the email you need help with..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {!showResponse ? (
            <button 
              onClick={handleSubmit}
              disabled={!inputPrompt.trim() || isGenerating}
              className="shrink-0 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          ) : (
            <a 
              href={getTryLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="shrink-0 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              Try with Heidi
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 