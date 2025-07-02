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

// Polyfill TextEncoder/TextDecoder for Node.js environment
import { TextEncoder, TextDecoder } from 'util';
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock AWS SES client
jest.mock('@aws-sdk/client-ses', () => {
  return {
    SESClient: class {
      send = jest.fn().mockResolvedValue({});
    },
    SendEmailCommand: class {}
  };
});

// Mock environment variables
process.env = {
  ...process.env,
  OPENAI_API_KEY: 'test_openai_key',
  AMAZON_API_KEY: 'test_amazon_key',
  AMAZON_SECRET_KEY: 'test_amazon_secret',
  RICARDO_API_KEY: 'test_ricardo_key'
};

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
