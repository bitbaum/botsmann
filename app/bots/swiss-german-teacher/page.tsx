"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import TableOfContents, { TOCItem } from "@/components/TableOfContents";

// Lazy load components for better performance
const EmailGenerator = dynamic(() => import("./components/EmailGenerator"), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
});

const TextGenerator = dynamic(() => import("./components/TextGenerator"), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
});

export default function SwissGermanTeacher() {
  // State variables
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [preferences, setPreferences] = useState({
    events: false,
    newsletters: false,
    blog: false,
    videos: false,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [demoResponse, setDemoResponse] = useState<string | null>(null);
  const [demoResponseType, setDemoResponseType] = useState<string>("");

  const popupRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // CSS classes
  const btnPrimary = "px-6 py-3 bg-openai-green text-white rounded-md font-medium hover:bg-emerald-600 transition-all";
  const btnSecondary = "px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all";
  const cardStyle = "p-8 bg-white rounded-xl shadow-sm border border-gray-200";
  const comingSoonBadge = "absolute top-2 right-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200";
  const featureNumberBadge = "flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4";
  const featureNumberText = "text-sm font-semibold text-blue-600";

  // Demo data
  const chatzTableData = [
    {
      term: "d'Chatz, -e",
      meaning: "die Katze (cat)",
      highGerman: "Die Katze schläft auf dem Sofa.",
      swissGerman: "D'Chatz schloft ufem Sofa."
    },
    {
      term: "de Stubetiger, -",
      meaning: "der Stubentiger (house cat)",
      highGerman: "Unser Stubentiger fängt keine Mäuse.",
      swissGerman: "Euse Stubetiger fangt kei Müüs."
    },
    {
      term: "d'Büsi, -s",
      meaning: "das Kätzchen (kitten/cat - affectionate)",
      highGerman: "Das Büsi ist sehr verspielt.",
      swissGerman: "S'Büsi isch sehr verspilt."
    }
  ];

  // Function to generate a chat link
  const getTryLink = () => {
    return "https://chat.openai.com/g/g-sKnMQdpKf-heidi-swiss-german-teacher";
  };

  // Handler functions
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setWaitlistSubmitted(true);
    }, 1000);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateDemoResponse = () => {
    if (inputValue.toLowerCase().includes("cat") || inputValue.toLowerCase().includes("chatz")) {
      setDemoResponseType("cat");
      setDemoResponse("Information about the Swiss German word for 'cat'");
    } else {
      setDemoResponseType("text");
      setDemoResponse(`Here's how to say "${inputValue}" in Swiss German: [simulated response]`);
    }
  };

  // Table of Contents items
  const tocItems: TOCItem[] = [
    { id: 'intro', label: 'Introduction' },
    { 
      id: 'language-learning', 
      label: 'Language Learning',
      subItems: [
        { id: 'vocabulary-builder', label: 'Vocabulary Builder' },
        { id: 'conversation-practice', label: 'Conversation Practice' },
        { id: 'grammar-explanations', label: 'Grammar Explanations' },
      ]
    },
    {
      id: 'communication', 
      label: 'Communication Assistance',
      subItems: [
        { id: 'email-examples', label: 'Email Writing' },
        { id: 'texting-examples', label: 'Texting Help' },
      ]
    },
    { 
      id: 'integration', 
      label: 'Social',
      subItems: [
        { id: 'events', label: 'Zürich Events' },
        { id: 'cultural-insights', label: 'Cultural Insights' },
      ]
    },
    { id: 'swiss-content', label: 'Swiss Content' },
    { id: 'future-vision', label: 'Development Roadmap' },
    { id: 'waitlist-form', label: 'Join Waitlist' },
  ];

  // Check for demo mode and scroll to top when page loads
  useEffect(() => {
    if (searchParams?.get("demo") === "true") {
      setDemoMode(true);
    }
    
    // Always scroll to top on page load
    window.scrollTo(0, 0);
    
    // If there's a hash in the URL, clear it to prevent auto-scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add noscript fallback for progressive enhancement */}
      <noscript>
        <p className="text-center text-gray-600 p-4">
          JavaScript is required to use the interactive features. Please enable it or visit{' '}
          <a href={getTryLink()} className="text-openai-green underline">Heidi's bot</a> directly.
        </p>
      </noscript>
      
      <main className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Heidi 🐄
            </h1>
            <p className="text-2xl text-gray-800 font-medium mb-4">
              Learn Swiss German and Navigate Zurich with AI 🇨🇭
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Personalized guidance to help you master Swiss German and connect with Swiss culture
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Try Heidi for Free
              </a>
              <a href="#features" className={btnSecondary}>
                Explore Features
              </a>
            </div>
          </div>
          
          {/* Feature Navigation Tiles */}
          <div id="features" className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Language Tile */}
              <a href="#language-learning" className="group flex flex-col p-6 bg-white border border-green-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Language Learning</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Master Swiss German through vocabulary building, conversation practice, and grammar lessons
                </p>
                <div className="mt-auto text-openai-green font-medium flex items-center">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>

              {/* Communication Tile */}
              <a href="#communication" className="group flex flex-col p-6 bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Communication</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Craft emails in High German and text messages in Swiss German for everyday situations
                </p>
                <div className="mt-auto text-openai-green font-medium flex items-center">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>

              {/* Social Tile */}
              <a href="#integration" className="group flex flex-col p-6 bg-white border border-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Social</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Connect with the local community through events and cultural insights
                </p>
                <div className="mt-auto text-openai-green font-medium flex items-center">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>

              {/* Swiss Content Tile */}
              <a href="#swiss-content" className="group flex flex-col p-6 bg-white border border-amber-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Swiss Content</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Explore authentic Swiss German content curated to match your proficiency level
                </p>
                <div className="mt-auto text-openai-green font-medium flex items-center">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents */}
            <TableOfContents items={tocItems} />
            
            <div className="flex-1">
              {/* Language Learning Section */}
              <section id="language-learning" className="mb-24 pb-6 pt-6 px-6 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Language Learning</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 ml-14">
                  Master Swiss German through personalized lessons, vocabulary building, and conversation practice.
                </p>

                {/* Vocabulary Builder */}
                <div id="vocabulary-builder" className={`${cardStyle} mb-10`}>
                  <h3 className="text-xl font-semibold mb-2">Vocabulary Builder</h3>
                  <p className="mb-4">Build your Swiss German vocabulary with contextually-relevant words and phrases.</p>
                  
                  <div className="bg-white p-3 rounded-md text-sm mb-4 shadow-sm">
                    <p className="font-medium mb-3">Example: Words for "cat" in Swiss German</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border-separate border-spacing-0">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left p-2 border-b">Swiss German Term</th>
                            <th className="text-left p-2 border-b">Meaning</th>
                            <th className="text-left p-2 border-b">Usage Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border-b">d'Chatz</td>
                            <td className="p-2 border-b">cat (standard)</td>
                            <td className="p-2 border-b">D'Chatz schloft uf em Sofa.</td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">s'Büsi</td>
                            <td className="p-2 border-b">cat (affectionate)</td>
                            <td className="p-2 border-b">Lueg mal wie herzig das Büsi isch!</td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">de Stubetiger</td>
                            <td className="p-2 border-b">house cat</td>
                            <td className="p-2 border-b">Euse Stubetiger fangt kei Müüs.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="cursor-pointer text-center p-2 bg-green-100 hover:bg-green-200 rounded-md text-green-800 transition-colors mb-4" onClick={togglePopup}>
                    <span className="font-medium">Try an Interactive Example</span>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      Start Building Your Vocabulary
                    </a>
                  </div>
                </div>

                {/* Conversation Practice */}
                <div id="conversation-practice" className={`${cardStyle} mb-10`}>
                  <h3 className="text-xl font-semibold mb-2">Conversation Practice</h3>
                  <p className="mb-4">
                    Practice everyday conversations with guidance on pronunciation, grammar, and cultural context.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md text-sm shadow-sm">
                      <p className="font-medium mb-2">Example Dialogue: Ordering Coffee</p>
                      <div className="space-y-2">
                        <p><strong>Barista:</strong> Grüezi, was dörfs sii?</p>
                        <p className="text-xs text-gray-500">Translation: Hello, what would you like?</p>
                        
                        <p><strong>You:</strong> Grüezi, ich hätt gern en Caffè Latte, bitte.</p>
                        <p className="text-xs text-gray-500">Translation: Hello, I'd like a latte, please.</p>
                        
                        <p><strong>Barista:</strong> Gern. Zum da trinke oder zum mitneh?</p>
                        <p className="text-xs text-gray-500">Translation: Gladly. To drink here or to take away?</p>
                        
                        <p><strong>You:</strong> Zum mitneh, bitte.</p>
                        <p className="text-xs text-gray-500">Translation: To take away, please.</p>
                        
                        <p><strong>Barista:</strong> Das macht vier Franke füfzg.</p>
                        <p className="text-xs text-gray-500">Translation: That's four francs fifty.</p>
                        
                        <p><strong>You:</strong> Da isch s'Geld. Merci villmal.</p>
                        <p className="text-xs text-gray-500">Translation: Here's the money. Thank you very much.</p>
                        
                        <p><strong>Barista:</strong> Danke au. En schöne Tag no.</p>
                        <p className="text-xs text-gray-500">Translation: Thank you too. Have a nice day.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      Practice Conversations
                    </a>
                  </div>
                </div>

                {/* Grammar Explanations */}
                <div id="grammar-explanations" className={`${cardStyle} mb-10 relative`}>
                  <div className={comingSoonBadge}>Coming Soon</div>
                  <h3 className="text-xl font-semibold mb-2">Grammar Explanations</h3>
                  <p className="mb-4">
                    Learn Swiss German grammar with clear, concise explanations and examples that highlight the differences from Standard German.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Articles and Gender</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• The three genders in Swiss German</li>
                        <li>• When to use "de", "d'" and "s'"</li>
                        <li>• Differences from Standard German</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Verb Conjugation</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Present tense forms</li>
                        <li>• Past tense expressions</li>
                        <li>• Modal verbs in Swiss German</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className={btnSecondary}
                    >
                      Get Notified When Available
                    </button>
                  </div>
                </div>
              </section>

              {/* Communication Assistance Section */}
              <section id="communication" className="mb-24 pb-6 pt-6 px-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Communication Assistance</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 ml-14">
                  Learn to communicate effectively in Swiss German for everyday situations, from professional emails to casual text messages.
                </p>

                <div id="email-examples" className={`${cardStyle} mb-10`}>
                  <h3 className="text-xl font-semibold mb-2">Email Writing</h3>
                  <p className="mb-4">
                    Generate Swiss-style emails that follow cultural norms and use dialect-appropriate expressions, or get help responding to German emails you've received.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md text-sm mb-4 shadow-sm">
                      <p className="font-semibold mb-1">What You Asked For:</p>
                      <p className="text-gray-600 italic">
                        "Help me write an email to reschedule an apartment viewing"
                      </p>
                      <p className="font-semibold mt-3 mb-1">High German Response (Professional Context):</p>
                      <p className="text-gray-600 italic">
                        Sehr geehrte Frau Meier,<br />
                        Ich schreibe Ihnen bezüglich der Wohnungsbesichtigung am kommenden Donnerstag.<br />
                        Wäre es möglich, den Termin auf 18:00 Uhr zu verschieben?<br />
                        Mit freundlichen Grüßen,<br />
                        Thomas
                      </p>
                      <p className="text-xs text-gray-500 mt-1">*Heidi noted: This formal structure follows the standard format used by native German speakers in professional contexts.</p>
                    </div>
                    <div className="bg-white p-3 rounded-md text-sm shadow-sm">
                      <p className="font-semibold mb-1">Swiss German Response (Informal Context):</p>
                      <p className="text-gray-600 italic">
                        Sali Frau Meier,<br />
                        Ich schriibe dir wäg de Wonigsbsichtigung am Donnstig.<br />
                        Wärs möglich, de Termin uf di Sechsi z'verschiebe?<br />
                        Merci vilmal und en schöne Tag,<br />
                        Thomas
                      </p>
                      <p className="text-xs text-gray-500 mt-1">*Heidi noted: I've used the Zürich dialect forms you've been practicing, avoiding the Basel expressions you frequently confused in our sessions.</p>
                      <p className="text-xs text-gray-400 mt-1">Translation: Hi Ms. Meier, I'm writing about the apartment viewing on Thursday. Would it be possible to move it to 6 PM? Thanks a lot and have a nice day, Thomas</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-medium mb-3">Try It Yourself</h4>
                      <p className="text-gray-600 mb-4">Generate your own Swiss-style email:</p>
                      <EmailGenerator getTryLink={getTryLink} />
                    </div>
                  </div>
                  <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-gray-900 mb-2">Ask Heidi To:</h4>
                    <ul className="mb-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"Write an email in High German to my landlord about a repair"</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"Help me understand this email: [paste German email]"</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"Draft a response to this message with more details"</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                        Get Email Help from Heidi
                      </a>
                    </div>
                  </div>
                </div>

                <div id="texting-examples" className={`${cardStyle} mb-10`}>
                  <h3 className="text-xl font-semibold mb-2">Texting Help</h3>
                  <p className="mb-4">
                    Master everyday Swiss German texting with dialect-appropriate casual expressions, or get help understanding messages you've received.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md text-sm mb-4 shadow-sm">
                      <p className="font-semibold mb-2">Common Zürich Texting Phrases:</p>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-medium">Sali! Wie gaht's?</span>
                          <span className="text-gray-600 block mt-1">Hi! How are you? (Casual greeting)</span>
                        </li>
                        <li>
                          <span className="font-medium">Ich bi spöter. Sorry!</span>
                          <span className="text-gray-600 block mt-1">I'll be late. Sorry!</span>
                          <span className="text-xs text-gray-400 block">Translation: I'm late. Sorry!</span>
                        </li>
                        <li>
                          <span className="font-medium">Treffe mer üs am Bellevue?</span>
                          <span className="text-gray-600 block mt-1">Shall we meet at Bellevue?</span>
                          <span className="text-xs text-gray-400 block">Translation: Shall we meet at Bellevue?</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-medium mb-3">Try It Yourself</h4>
                      <p className="text-gray-600 mb-4">Get quick texting tips in Swiss German:</p>
                      <TextGenerator getTryLink={getTryLink} />
                    </div>
                  </div>
                  <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-gray-900 mb-2">Ask Heidi To:</h4>
                    <ul className="mb-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"Write a WhatsApp message in Swiss German to invite a friend for coffee"</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"What does this Swiss German message mean: [paste message]"</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>"Help me respond to this message about weekend plans"</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <a href={getTryLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                        Message Like a Local
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Social Integration Section */}
              <section id="integration" className="mb-24 pb-6 pt-6 px-6 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Social</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 ml-14">
                  Connect with the local community by discovering cultural events and understanding local customs.
                </p>

                {/* Events */}
                <div id="events" className={`${cardStyle} mb-10`}>
                  <h3 className="text-xl font-semibold mb-2">Zürich Events</h3>
                  <div className="flex items-center mb-4">
                    <p className="text-gray-600 mr-3">
                      Find events in Zürich that reinforce your language learning and help you connect with locals.
                    </p>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                      Beta Feature
                    </span>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="p-4 bg-white border rounded-md shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Swiss Language Exchange Meetup</p>
                          <p className="text-sm text-gray-600 mb-2">Tonight, 7pm at Café Sphères</p>
                          <p>Practice Swiss German with locals in a relaxed setting with guided conversation topics.</p>
                        </div>
                        <a 
                          href="https://www.meetup.com/zurich-german-language-exchange/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-all ml-2 shrink-0"
                        >
                          Event Info
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-md shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Adriatique at Zukunft</p>
                          <p className="text-sm text-gray-600 mb-2">Saturday, 11pm at Zukunft Club</p>
                          <p>Meet people while enjoying music in one of Zürich's most popular venues.</p>
                        </div>
                        <div className="flex flex-col space-y-2 ml-2 shrink-0">
                          <a 
                            href="https://zukunft.cl" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-all text-center"
                          >
                            Event Info
                          </a>
                          <a 
                            href="https://zukunft.cl/tickets" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-all text-center"
                          >
                            Buy Ticket
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border rounded-md shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Ferdinand Hodler Exhibit</p>
                          <p className="text-sm text-gray-600 mb-2">This weekend at Kunsthaus Zürich</p>
                          <p>Explore Swiss art history and connect with art enthusiasts at this special exhibition.</p>
                        </div>
                        <a 
                          href="https://www.kunsthaus.ch" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-all ml-2 shrink-0"
                        >
                          Event Info
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <a
                        href={getTryLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnPrimary}
                      >
                        Find More Events
                      </a>
                    </div>
                  </div>
                </div>

                {/* Cultural Insights */}
                <div id="cultural-insights" className={`${cardStyle} mb-10 relative`}>
                  <div className={comingSoonBadge}>Coming Soon</div>
                  <h3 className="text-xl font-semibold mb-2">Cultural Insights</h3>
                  <p className="mb-4">
                    Understand Swiss customs, traditions, and social norms to navigate daily life with confidence.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Social Etiquette</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Greetings and introductions</li>
                        <li>• Punctuality and time management</li>
                        <li>• Dining customs and tipping</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Local Traditions</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Seasonal festivals and celebrations</li>
                        <li>• Regional customs and foods</li>
                        <li>• Holidays and observances</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">History</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Formation of the Swiss Confederation</li>
                        <li>• Historical neutrality and humanitarian effort</li>
                        <li>• Evolution of Swiss identity and culture</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Civics & Governance</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Direct democracy and referendum system</li>
                        <li>• Federalism and cantonal structure</li>
                        <li>• Neutrality</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className={btnSecondary}
                    >
                      Get Notified When Available
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Swiss Content Section */}
              <section id="swiss-content" className="mb-24 pb-6 pt-6 px-6 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Swiss Content</h2>
                  <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-8 ml-14">
                  Enhance your learning with authentic Swiss German content curated to match your proficiency level.
                </p>
                
                <div className={`${cardStyle} relative`}>
                  <p className="text-lg text-gray-600 mb-6">
                    Our team is currently developing a rich library of content to help you immerse yourself in Swiss German language and culture.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 bg-white rounded-md text-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <h3 className="font-medium text-gray-900 mb-2">Video Content</h3>
                      <p className="text-sm text-gray-600">Short videos with subtitles in Standard and Swiss German</p>
                    </div>
                    
                    <div className="p-5 bg-white rounded-md text-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <h3 className="font-medium text-gray-900 mb-2">Podcasts</h3>
                      <p className="text-sm text-gray-600">Audio content with transcripts for listening practice</p>
                    </div>
                    
                    <div className="p-5 bg-white rounded-md text-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <h3 className="font-medium text-gray-900 mb-2">Articles</h3>
                      <p className="text-sm text-gray-600">News articles and blog posts with vocabulary assistance</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className={btnSecondary}
                    >
                      Join Waitlist for Early Access
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Future of Swiss German Learning Section */}
              <section id="future-vision" className="py-12 bg-gray-50 rounded-xl mb-16">
                <div className="px-6">
                  <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900">
                    The Future of Swiss German Learning
                  </h2>
                  <p className="mb-6 text-lg text-gray-600">
                    We're building Heidi to transform how people learn Swiss German and engage with Swiss culture. Our vision extends beyond language learning to create meaningful connections and authentic experiences.
                  </p>
                  
                  <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Help Us Build Heidi</h3>
                    <p className="text-gray-600 mb-4">
                      We're actively looking for Swiss German experts, linguists, and skilled engineers to join our team and help create the next generation of language learning technology.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">We're Looking For:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Swiss German native speakers and dialect experts</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Computational linguists with NLP experience</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Full-stack developers with AI experience</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Get Involved:</h4>
                        <p className="text-gray-600 mb-3">Interested in contributing to Heidi's development? Let us know your expertise.</p>
                        <a 
                          href="mailto:join@botsmann.com" 
                          className="inline-flex items-center text-openai-green font-medium hover:underline"
                        >
                          <span>Contact our team</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Development Roadmap:</h3>
                    <ul className="space-y-4">
                      <li className="flex">
                        <div className={featureNumberBadge}>
                          <span className={featureNumberText}>1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">User Profiles</h4>
                          <p className="text-gray-600">Personalized learning experiences that remember your progress and adapt to your needs.</p>
                          <p className="text-sm text-gray-500 mt-1">Target: Q3 2025</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className={featureNumberBadge}>
                          <span className={featureNumberText}>2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Zürich Event Integration</h4>
                          <p className="text-gray-600">Find events that match your interests and help you connect with like-minded people.</p>
                          <p className="text-sm text-gray-500 mt-1">Target: Q3 2025</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className={featureNumberBadge}>
                          <span className={featureNumberText}>3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Swiss German Content Library</h4>
                          <p className="text-gray-600">Curated collection of videos, podcasts, and articles to immerse yourself in the language.</p>
                          <p className="text-sm text-gray-500 mt-1">Target: Q4 2025</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className={featureNumberBadge}>
                          <span className={featureNumberText}>4</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Progressive Learning System</h4>
                          <p className="text-gray-600">Smart vocabulary practice that optimizes your learning path based on your progress.</p>
                          <p className="text-sm text-gray-500 mt-1">Target: Q1 2026</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <p className="mb-4 text-gray-600">
                      Have questions about our roadmap or want to contribute to Heidi's development?
                    </p>
                    <a 
                      href="mailto:team@botsmann.com" 
                      className="inline-flex items-center justify-center text-openai-green hover:underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact our development team
                    </a>
                  </div>
                </div>
              </section>
              
              {/* Waitlist Form Section */}
              <section id="waitlist-form" className="mb-16 max-w-3xl mx-auto">
                <div className={cardStyle}>
                  <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">Join Waitlist</h2>
                  {waitlistSubmitted ? (
                    <p className="text-green-600 text-center">Thank you! You're on the list.</p>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-openai-green"
                        aria-label="Email for waitlist"
                        required
                      />
                      <div>
                        <p className="block text-sm font-medium text-gray-700">Interests (optional):</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {(['events', 'newsletters', 'blog', 'videos'] as const).map((key) => (
                            <div key={key} className="flex items-center">
                              <input
                                type="checkbox"
                                id={key}
                                name={key}
                                className="h-4 w-4 text-openai-green focus:ring-openai-green"
                                checked={preferences[key]}
                                onChange={handlePreferenceChange}
                              />
                              <label htmlFor={key} className="ml-2 text-sm text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full ${btnPrimary} ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {submitting ? 'Submitting...' : 'Join Waitlist'}
                      </button>
                      {formError && <p className="mt-2 text-sm text-red-600" role="alert">{formError}</p>}
                    </form>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chatz Popup */}
      {typeof window !== 'undefined' && isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && togglePopup()}
        >
          <div
            ref={popupRef}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
          >
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="Close popup"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Heidi's Output</h3>
            <p className="text-gray-600 mb-2">Iigabä: Chatz</p>
            <p className="text-gray-600 mb-4">Iigabetyp: Es Wort (es Nomen, Englisch) – Contextual learning aid</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">d'Iigabä</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">d'Bedütig</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Es Satz uf Hochdütsch</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Es Satz uf Züridütsch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chatzTableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-gray-600">{row.term}</td>
                      <td className="px-3 py-2 text-gray-600">{row.meaning}</td>
                      <td className="px-3 py-2 text-gray-600">{row.highGerman}</td>
                      <td className="px-3 py-2 text-gray-600">{row.swissGerman}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Züridütsch Text</h4>
              <p className="text-gray-600">
                Mini Chatz isch e Schmusechatz und schnurrt jede Nacht uf em Sofa. Sie jagt gärn de Büsi im Garte, wo all d'Chätzli spiled. Hüt ha i e Text gschickt, dass i sie mit ans Zürcher Katzefäscht nimm—sie isch echt e Stubetiger!
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">Try more Swiss German words and phrases with Heidi!</p>
              <a 
                href={getTryLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={btnPrimary}
              >
                Continue with Heidi
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Demo mode - Render only on client side */}
      {typeof window !== 'undefined' && demoMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Heidi Demo Mode</h2>
            {demoResponse ? (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Your Input: "{inputValue}"</h3>
                {demoResponseType === 'cat' ? (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">d'Iigabä</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">d'Bedütig</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hochdütsch</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Züridütsch</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-3 py-2 text-sm text-gray-500">d'Chatz, -e</td>
                            <td className="px-3 py-2 text-sm text-gray-500">CH: d'Chatz DE: die Katze</td>
                            <td className="px-3 py-2 text-sm text-gray-500">Die Katze miaut laut.</td>
                            <td className="px-3 py-2 text-sm text-gray-500">D'Chatz miaut luut.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">This is a simulated response for local development.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>{demoResponse}</p>
                    <p className="mt-4 text-sm text-gray-500">This is a simulated response for local development.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <p>Enter a word or phrase to see how Heidi would respond.</p>
                <p className="text-sm text-gray-500 mt-2">Try the word "cat" to see a special formatted response!</p>
                <div className="mt-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Try 'cat' or any other word"
                    className="flex-grow border border-gray-300 rounded-md p-2"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-openai-green text-white px-4 py-2 rounded-md"
                    onClick={generateDemoResponse}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setDemoMode(false);
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/bots/swiss-german-teacher');
                  }
                }}
              >
                Close Demo
              </button>
              {demoResponse && (
                <button
                  className="text-openai-green hover:underline"
                  onClick={() => {
                    setDemoResponse(null);
                  }}
                >
                  Try Another Word
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// This is a comment to demonstrate GitHub deployment workflow
