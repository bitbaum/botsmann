import { useState } from "react";
import { btnPrimary } from "../../utils/constants";
import { openHeidiBot } from "../../utils/navigation";

interface EmailGeneratorProps {
  getTryLink: () => string;
}

const EmailGenerator = ({ getTryLink }: EmailGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  // Email types with icons and detailed prompts
  const emailTypes = [
    {
      name: "Information Request",
      icon: "📋",
      prompt:
        "Write an email to request information about Swiss language courses",
      description: "Ask for details about services, products, or opportunities",
    },
    {
      name: "Appointment",
      icon: "📅",
      prompt: "Write an email to reschedule a doctor's appointment",
      description: "Schedule, reschedule, or cancel appointments",
    },
    {
      name: "Complaint",
      icon: "⚠️",
      prompt: "Write a polite complaint email about a delayed delivery",
      description: "Express dissatisfaction professionally",
    },
    {
      name: "Refund Request",
      icon: "💰",
      prompt: "Write an email requesting a refund for a defective product",
      description: "Request money back for products or services",
    },
    {
      name: "Job Application",
      icon: "👔",
      prompt: "Write a cover email for a job application",
      description: "Apply for positions or follow up after interviews",
    },
    {
      name: "Thank You",
      icon: "🙏",
      prompt: "Write a thank you email after a business meeting",
      description: "Express gratitude for help, meetings, or gifts",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      openHeidiBot(`Generate an email: ${prompt}`);
    } catch (err) {
      console.error("Error generating email:", err);
      setError("Failed to connect to Heidi. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectEmailType = (index: number) => {
    setSelectedType(index);
    setPrompt(emailTypes[index].prompt);
  };

  return (
    <div className="space-y-6">
      {/* Email type selection - improved design */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-medium text-gray-900 mb-3">Select Email Type:</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emailTypes.map((type, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center p-3 rounded-lg transition-all ${
                selectedType === index
                  ? "bg-green-50 border-2 border-green-500 shadow-sm"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => selectEmailType(index)}
              aria-pressed={selectedType === index}
              aria-label={`Use ${type.name} template`}
            >
              <span className="text-2xl mr-3">{type.icon}</span>
              <div className="text-left">
                <span
                  className={`block font-medium ${
                    selectedType === index ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {type.name}
                </span>
                <span className="text-xs text-gray-500">
                  {type.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email-prompt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What do you need help with?
          </label>
          <textarea
            id="email-prompt"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            placeholder="E.g., 'Write an email to cancel my gym membership'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            aria-describedby={error ? "email-prompt-error" : undefined}
          ></textarea>
          {error && (
            <p
              id="email-prompt-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`${btnPrimary} ${isLoading || !prompt.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Generate email"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Generate with Heidi"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailGenerator;
