import { EmailService } from '@/lib/email/service';
import { CustomerSchema } from '@/lib/schemas/customer';

// Mock the AWS SDK
vi.mock('@aws-sdk/client-ses', () => ({
  // A function expression, not an arrow: vitest builds a mocked constructor
  // with Reflect.construct, and an arrow function is not constructible, so
  // `new SESClient()` threw "is not a constructor". jest tolerated the arrow.
  SESClient: vi.fn().mockImplementation(function () {
    return { send: vi.fn().mockResolvedValue({ MessageId: 'test-message-id' }) };
  }),
  // Also `new`-ed by the code under test, so it needs a constructible
  // function too. Returning an object from a constructor overrides `this`,
  // which is what makes the params object come back out.
  SendEmailCommand: vi.fn().mockImplementation(function (params: unknown) {
    return params;
  }),
}));

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    // Set test environment variables
    process.env.NEXT_AWS_ACCESS_KEY_ID = 'test_access_key';
    process.env.NEXT_AWS_SECRET_ACCESS_KEY = 'test_secret_key';
    process.env.NEXT_AWS_REGION = 'eu-central-1';
    process.env.FROM_EMAIL = 'test@example.com';
    process.env.ADMIN_EMAIL = 'admin@example.com';

    emailService = new EmailService();
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.NEXT_AWS_ACCESS_KEY_ID;
    delete process.env.NEXT_AWS_SECRET_ACCESS_KEY;
    delete process.env.NEXT_AWS_REGION;
    delete process.env.FROM_EMAIL;
    delete process.env.ADMIN_EMAIL;
  });

  it('sends welcome email', async () => {
    const customer = CustomerSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      preferences: {
        newsletter: true,
        productUpdates: true,
      },
    });

    await expect(emailService.sendWelcomeEmail(customer)).resolves.not.toThrow();
  });

  it('sends admin notification', async () => {
    const customer = CustomerSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      preferences: {
        newsletter: true,
        productUpdates: false,
      },
    });

    await expect(emailService.sendAdminNotification(customer)).resolves.not.toThrow();
  });

  it('handles invalid customer data', async () => {
    await expect(
      CustomerSchema.parseAsync({
        name: '',
        email: 'invalid-email',
        message: '',
      }),
    ).rejects.toThrow();
  });
});
