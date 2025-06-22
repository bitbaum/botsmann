import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/consultations/route';

jest.mock('@/src/lib/mongodb', () => ({
  connectDB: jest.fn().mockResolvedValue(null)
}));

const mockCreate = jest.fn(async (data) => ({ _id: '1', ...data, status: 'new' }));
const mockFindById = jest.fn(async (id) => ({
  _id: id,
  name: 'Test User',
  email: 'test@example.com',
  message: 'Test message',
  status: 'new'
}));
const mockDeleteMany = jest.fn();

jest.mock('@/src/lib/models/consultation', () => ({
  Consultation: {
    create: (...args: any[]) => mockCreate(...args),
    findById: (...args: any[]) => mockFindById(...args),
    deleteMany: (...args: any[]) => mockDeleteMany(...args)
  }
}));

import { Consultation } from '@/src/lib/models/consultation';

describe('Consultations API', () => {

  beforeEach(async () => {
    await Consultation.deleteMany({});
  });

  it('creates a consultation', async () => {
    const { req } = createMocks({
      method: 'POST',
      headers: { 'x-api-key': 'development-key' },
      body: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      },
    });
    // node-mocks-http doesn't provide req.json(), add it for Next.js handler
    // @ts-ignore
    req.json = async () => req.body;

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();

    const consultation = await Consultation.findById(data.id);
    expect(consultation).toBeDefined();
    expect(consultation.name).toBe('Test User');
    expect(consultation.email).toBe('test@example.com');
    expect(consultation.message).toBe('Test message');
    expect(consultation.status).toBe('new');
  });
});
