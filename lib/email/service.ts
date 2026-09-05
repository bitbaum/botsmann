import { sendMail, fromAddress, conventionalFrom } from '@bitbaum/mail-kit';
import type { Customer } from '@/lib/schemas/customer';
import { logger } from '../logger';

export class EmailService {
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    // RESEND_FROM is the fleet-wide sender SSOT (read by mail-kit); the
    // conventional fallback sends as botsmann@fleetcrown.orangecat.ch.
    this.fromEmail = fromAddress() ?? conventionalFrom('Botsmann');
    this.adminEmail = process.env.ADMIN_EMAIL || 'REDACTED_EMAIL';
  }

  async sendWelcomeEmail(customer: Customer): Promise<void> {
    const result = await sendMail({
      from: this.fromEmail,
      to: customer.email,
      subject: 'Welcome to Botsmann!',
      text: `Hello ${customer.name},\n\nThank you for your interest in Botsmann! We've received your message and will get back to you soon.\n\nBest regards,\nThe Botsmann Team`,
    });

    if (!result.sent) {
      // Preserve the old throw-on-failure contract — the caller catches.
      logger.error('Failed to send welcome email:', result.error);
      throw new Error(`Failed to send welcome email: ${result.error}`);
    }
  }

  async sendAdminNotification(customer: Customer): Promise<void> {
    const result = await sendMail({
      from: this.fromEmail,
      to: this.adminEmail,
      subject: 'New Customer Registration',
      text: `New customer registration:\n\nName: ${customer.name}\nEmail: ${customer.email}\nMessage: ${customer.message}\n\nPreferences:\n- Newsletter: ${customer.preferences.newsletter ? 'Yes' : 'No'}\n- Product Updates: ${customer.preferences.productUpdates ? 'Yes' : 'No'}`,
    });

    if (!result.sent) {
      // Preserve the old throw-on-failure contract — the caller catches.
      logger.error('Failed to send admin notification:', result.error);
      throw new Error(`Failed to send admin notification: ${result.error}`);
    }
  }
}
