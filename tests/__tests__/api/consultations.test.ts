import mongoose from 'mongoose';
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/consultations/route';
import { connectDB } from '@/src/lib/mongodb';
import { Consultation } from '@/src/lib/models/consultation';

describe('Consultations API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Consultation.deleteMany({});
  });

  it('creates a consultation', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      },
    });

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
