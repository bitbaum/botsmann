import '@testing-library/jest-dom';

// Mock fetch globally
const mockFetch = jest.fn().mockImplementation(
  (): Promise<Partial<Response>> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
);

// @ts-ignore - fetch mock
global.fetch = mockFetch;

// Mock environment variables for testing
process.env = {
  ...process.env,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'test_openai_key',
  AMAZON_API_KEY: process.env.AMAZON_API_KEY || 'test_amazon_key',
  AMAZON_SECRET_KEY: process.env.AMAZON_SECRET_KEY || 'test_amazon_secret',
  RICARDO_API_KEY: process.env.RICARDO_API_KEY || 'test_ricardo_key',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/botsmann_test',
  NODE_ENV: 'test'
};

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
