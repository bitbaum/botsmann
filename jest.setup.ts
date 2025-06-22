import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// Node.js 18+ provides fetch and Response globally

// Mock fetch globally
const mockFetch = jest.fn().mockImplementation(
  (): Promise<Partial<Response>> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
);

// @ts-ignore - fetch mock
global.fetch = mockFetch as any;

// Minimal Response polyfill for API route tests
if (typeof global.Response === 'undefined') {
  class MockResponse {
    status: number;
    headers: Record<string, string>;
    private body: any;
    constructor(body: any, init?: { status?: number; headers?: Record<string, string> }) {
      this.body = body;
      this.status = init?.status ?? 200;
      this.headers = init?.headers ?? {};
    }
    async json() {
      return JSON.parse(this.body);
    }
  }
  // @ts-ignore
  global.Response = MockResponse;
}

// Mock environment variables
process.env.OPENAI_API_KEY = 'test_openai_key';
process.env.AMAZON_API_KEY = 'test_amazon_key';
process.env.AMAZON_SECRET_KEY = 'test_amazon_secret';
process.env.RICARDO_API_KEY = 'test_ricardo_key';
process.env.NEXT_AWS_ACCESS_KEY_ID = 'test_access';
process.env.NEXT_AWS_SECRET_ACCESS_KEY = 'test_secret';
process.env.NEXT_AWS_REGION = 'us-east-1';
process.env.NODE_ENV = 'test';

// Polyfill TextEncoder/Decoder for Node environments without them
if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
