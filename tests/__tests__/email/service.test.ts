import { EmailService } from '@/lib/email/service';
import { CustomerSchema } from '@/lib/schemas/customer';

// Mock the fleet mail layer — sendMail never throws; it returns a SendResult.
vi.mock('@bitbaum/mail-kit', () => ({
  sendMail: vi.fn().mockResolvedValue({ sent: true, id: 'test-message-id' }),
  fromAddress: vi.fn(() => process.env.RESEND_FROM),
  conventionalFrom: vi.fn((appName: string) => `${appName} <botsmann@fleetcrown.orangecat.ch>`),
}));

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    // Set test environment variables
    process.env.RESEND_FROM = 'test@example.com';
    process.env.ADMIN_EMAIL = 'admin@example.com';

    emailService = new EmailService();
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.RESEND_FROM;
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

  it('throws when the mail layer reports a failed send', async () => {
    const { sendMail } = await import('@bitbaum/mail-kit');
    vi.mocked(sendMail).mockResolvedValueOnce({
      sent: false,
      error: 'RESEND_API_KEY is not set',
      retryable: false,
    });

    const customer = CustomerSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      preferences: {
        newsletter: true,
        productUpdates: true,
      },
    });

    await expect(emailService.sendWelcomeEmail(customer)).rejects.toThrow(
      'Failed to send welcome email',
    );
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
