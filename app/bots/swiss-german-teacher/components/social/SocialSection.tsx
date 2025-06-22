import React from "react";
import {
  cardStyle,
  comingSoonBadge,
  btnPrimary,
  btnSecondary,
} from "../../utils/constants";

interface SocialSectionProps {
  getTryLink: () => string;
}

const SocialSection = ({ getTryLink }: SocialSectionProps) => {
  // Example events
  const events = [
    {
      title: "Swiss Language Exchange Meetup",
      time: "Tonight, 7pm at Café Sphères",
      description:
        "Practice Swiss German with locals in a relaxed setting with guided conversation topics.",
      infoLink: "https://www.meetup.com/zurich-german-language-exchange/",
    },
    {
      title: "Zurich Film Festival",
      time: "This weekend at various locations",
      description:
        "Great opportunity to hear Swiss German in context and meet locals who share your interests.",
      infoLink: "https://zff.com/en/home/",
      ticketLink: "https://zff.com/en/tickets/",
    },
  ];

  // Cultural topics
  const culturalTopics = [
    {
      title: "Social Etiquette",
      items: [
        "• Greetings and introductions",
        "• Punctuality and time management",
        "• Dining customs and tipping",
      ],
    },
    {
      title: "Local Traditions",
      items: [
        "• Seasonal festivals and celebrations",
        "• Regional customs and foods",
        "• Holidays and observances",
      ],
    },
    {
      title: "History",
      items: [
        "• Formation of the Swiss Confederation",
        "• Historical neutrality and humanitarian effort",
        "• Evolution of Swiss identity and culture",
      ],
    },
    {
      title: "Civics & Governance",
      items: [
        "• Direct democracy and separation of powers",
        "• Federalism and cantonal structure",
        "• Armed neutrality and militia system",
      ],
    },
  ];

  return (
    <section
      id="integration"
      className="mb-24 pb-6 pt-6 px-6 bg-purple-50 rounded-xl border border-purple-100"
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">Social</h2>
      </div>
      <p className="text-lg text-gray-600 mb-8 ml-14">
        Connect with the local community by discovering cultural events and
        understanding local customs.
      </p>

      {/* Events */}
      <div id="events" className={`${cardStyle} mb-10`}>
        <h3 className="text-xl font-semibold mb-2">Zürich Events</h3>
        <div className="flex items-center mb-4">
          <p className="text-gray-600 mr-3">
            Find events in Zürich that reinforce your language learning and help
            you connect with locals.
          </p>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
            Beta Feature
          </span>
        </div>

        <div className="space-y-4 mt-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 bg-white border rounded-md shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{event.time}</p>
                  <p>{event.description}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-2 shrink-0">
                  <a
                    href={event.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-all text-center"
                    aria-label={`Event info for ${event.title}`}
                  >
                    Event Info
                  </a>
                  {event.ticketLink && (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-all text-center"
                      aria-label={`Buy ticket for ${event.title}`}
                    >
                      Buy Ticket
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <a
              href={getTryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
              aria-label="Find more Swiss German events"
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
          Understand Swiss customs, traditions, and social norms to navigate
          daily life with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {culturalTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">{topic.title}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-6 text-center md:col-span-2">
            <button
              onClick={() =>
                document
                  .getElementById("waitlist-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={btnSecondary}
              aria-label="Get notified when cultural insights are available"
            >
              Get Notified When Available
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
