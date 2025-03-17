import { useState } from 'react';
import { btnPrimary } from '../../utils/constants';

interface TextGeneratorProps {
  getTryLink: () => string;
}

const TextGenerator = ({ getTryLink }: TextGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to ChatGPT with the prompt
      window.open(`${getTryLink()}?q=${encodeURIComponent(`Write a Swiss German text message: ${prompt}`)}`, '_blank');
    }, 500);
  };

  // Quick suggestion buttons
  const suggestions = [
    "I'll be 15 minutes late",
    "Want to meet for lunch?",
    "Thanks for yesterday"
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {suggestions.map(suggestion => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-sm"
            aria-label={`Use suggestion: ${suggestion}`}
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text-prompt" className="block text-sm font-medium text-gray-700 mb-1">
            What message do you need?
          </label>
          <textarea
            id="text-prompt"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={2}
            placeholder="E.g., 'I'm running late for our meeting'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            aria-describedby="text-prompt-error"
          ></textarea>
          {error && <p id="text-prompt-error" className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`${btnPrimary} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Generate text message"
          >
            {isLoading ? 'Processing...' : 'Generate Text Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextGenerator; 