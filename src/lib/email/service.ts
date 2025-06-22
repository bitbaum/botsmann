import type { Customer } from '@/src/lib/schemas/customer';

export class EmailService {
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@botsmann.com';
    this.adminEmail = process.env.ADMIN_EMAIL || 'REDACTED_EMAIL';
  }

  async sendWelcomeEmail(customer: Customer): Promise<void> {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    console.log(`Sending welcome email to ${customer.email}`);
  }

  async sendAdminNotification(customer: Customer): Promise<void> {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    console.log(`Sending admin notification for ${customer.email}`);
  }
}
