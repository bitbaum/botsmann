import { vi } from 'vitest';
/**
 * Mock for next/server in Jest tests
 *
 * This allows tests to import modules that use NextResponse/NextRequest
 * without loading the actual Next.js server runtime.
 */

// Use global Request/Response if available (jsdom), otherwise create simple mocks
const BaseRequest =
  globalThis.Request ||
  class MockRequest {
    url: string;
    method: string;
    headers: Map<string, string>;
    body: unknown;

    constructor(input: string | URL, init?: RequestInit) {
      this.url = input.toString();
      this.method = init?.method || 'GET';
      this.headers = new Map(Object.entries(init?.headers || {}));
      this.body = init?.body;
    }

    json() {
      return Promise.resolve(typeof this.body === 'string' ? JSON.parse(this.body) : this.body);
    }
  };

const BaseResponse =
  globalThis.Response ||
  class MockResponse {
    body: string | null;
    status: number;
    headers: Map<string, string>;

    constructor(body?: string | null, init?: ResponseInit) {
      this.body = body || null;
      this.status = init?.status || 200;
      this.headers = new Map(Object.entries(init?.headers || {}));
    }

    json() {
      return Promise.resolve(this.body ? JSON.parse(this.body) : null);
    }
  };

export class NextRequest extends BaseRequest {
  nextUrl: URL;

  constructor(input: string | URL, init?: RequestInit) {
    super(input, init);
    this.nextUrl = new URL(typeof input === 'string' ? input : input.toString());
  }

  get cookies() {
    return {
      get: vi.fn(),
      getAll: vi.fn(() => []),
      set: vi.fn(),
      delete: vi.fn(),
      has: vi.fn(() => false),
    };
  }

  get geo() {
    return {};
  }

  get ip() {
    return '127.0.0.1';
  }
}

export class NextResponse extends BaseResponse {
  static json(body: unknown, init?: ResponseInit) {
    const response = new NextResponse(JSON.stringify(body), {
      ...init,
      headers: {
        ...init?.headers,
        'content-type': 'application/json',
      },
    });
    return response;
  }

  static redirect(url: string | URL, status?: number) {
    return new NextResponse(null, {
      status: status || 307,
      headers: { Location: url.toString() },
    });
  }

  static rewrite(destination: string | URL) {
    return new NextResponse(null, {
      headers: { 'x-middleware-rewrite': destination.toString() },
    });
  }

  static next() {
    return new NextResponse(null);
  }

  get cookies() {
    return {
      get: vi.fn(),
      getAll: vi.fn(() => []),
      set: vi.fn(),
      delete: vi.fn(),
    };
  }
}

export const userAgent = vi.fn(() => ({
  isBot: false,
  browser: { name: 'Chrome', version: '100' },
  device: { type: undefined, vendor: undefined, model: undefined },
  engine: { name: 'Blink', version: '100' },
  os: { name: 'Mac OS', version: '12' },
  cpu: { architecture: undefined },
}));

export const userAgentFromString = vi.fn(() => userAgent());
