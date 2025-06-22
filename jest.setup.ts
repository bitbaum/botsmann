import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

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
// Provide Response constructor for API route tests
// @ts-ignore
global.Response =
  global.Response ||
  class MockResponse {
    body: any;
    status: number;
    headers: Record<string, string>;
    constructor(body: any, init: { status?: number; headers?: Record<string, string> } = {}) {
      this.body = body;
      this.status = init.status ?? 200;
      this.headers = init.headers ?? {};
    }
    async json() {
      try {
        return JSON.parse(this.body);
      } catch {
        return this.body;
      }
    }
    async text() {
      return this.body;
    }
  };
// Polyfill TextEncoder/TextDecoder for Node.js environment
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock environment variables
process.env = {
  ...process.env,
  OPENAI_API_KEY: 'test_openai_key',
  AMAZON_API_KEY: 'test_amazon_key',
  AMAZON_SECRET_KEY: 'test_amazon_secret',
  RICARDO_API_KEY: 'test_ricardo_key',
  MONGODB_URI: ''
};

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
