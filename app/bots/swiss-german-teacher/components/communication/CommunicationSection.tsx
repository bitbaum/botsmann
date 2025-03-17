import React from 'react';
import dynamic from 'next/dynamic';
import { cardStyle, comingSoonBadge, btnPrimary } from '../../utils/constants';

// Dynamically import components for better performance
const EmailGenerator = dynamic(() => import('./EmailGenerator'), {
  ssr: false,
  loading: () => <div className="h-60 bg-gray-100 rounded-lg animate-pulse"></div>
});

const TextGenerator = dynamic(() => import('./TextGenerator'), {
  ssr: false,
  loading: () => <div className="h-60 bg-gray-100 rounded-lg animate-pulse"></div>
});

interface CommunicationSectionProps {
  getTryLink: () => string;
}

const CommunicationSection = ({ getTryLink }: CommunicationSectionProps) => {
  return (
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
          Generate professional or casual emails that follow cultural norms and use appropriate expressions, or get help responding to German emails you've received.
        </p>
        
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-md text-sm mb-4 shadow-sm">
            <p className="font-semibold mb-1">What You Asked For:</p>
            <p className="text-gray-600 italic">
              "Help me write an email to reschedule an apartment viewing"
            </p>
            <p className="font-semibold mt-3 mb-1">High German Response (Professional Context):</p>
            <p className="text-gray-600 italic">
              Sehr geehrte Frau Meier<br />
              Ich schreibe Ihnen bezüglich der Wohnungsbesichtigung am kommenden Donnerstag.<br />
              Wäre es möglich, den Termin auf 18:00 Uhr zu verschieben?<br />
              Mit freundlichen Grüssen<br />
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
      </div>
    </section>
  );
};

export default CommunicationSection; 