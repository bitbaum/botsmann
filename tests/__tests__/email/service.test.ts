import { EmailService } from '@/src/lib/email/service';
import { CustomerSchema } from '@/src/lib/schemas/customer';

describe('EmailService', () => {
  let emailService: EmailService;
  
  beforeEach(() => {
    emailService = new EmailService();
    // Set test environment variables
    process.env.SENDGRID_API_KEY = 'test_key';
    process.env.EMAIL_FROM = 'test@example.com';
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.SENDGRID_WELCOME_TEMPLATE_ID = 'template_id';
    process.env.DASHBOARD_URL = 'https://test.example.com/dashboard';
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.SENDGRID_API_KEY;
    delete process.env.EMAIL_FROM;
    delete process.env.ADMIN_EMAIL;
    delete process.env.SENDGRID_WELCOME_TEMPLATE_ID;
    delete process.env.DASHBOARD_URL;
  });

  it('sends welcome email', async () => {
    const customer = CustomerSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      preferences: {
        newsletter: true,
        productUpdates: true
      }
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
        productUpdates: false
      }
    });

    await expect(emailService.sendAdminNotification(customer)).resolves.not.toThrow();
  });

  it('handles missing environment variables', async () => {
    delete process.env.SENDGRID_API_KEY;
    
    const customer = CustomerSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    });

    await expect(emailService.sendWelcomeEmail(customer)).rejects.toThrow();
  });

  it('handles invalid customer data', async () => {
    await expect(
      CustomerSchema.parseAsync({
        name: '',
        email: 'invalid-email',
        message: ''
      })
    ).rejects.toThrow();
  });
});
