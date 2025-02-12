import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { Customer } from '@/src/lib/schemas/customer';

export class EmailService {
  private ses: SESClient;
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    this.ses = new SESClient({
      region: process.env.NEXT_AWS_REGION || 'eu-central-1', // Frankfurt region for Swiss compliance
      credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY || ''
      }
    });
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@botsmann.com';
    this.adminEmail = process.env.ADMIN_EMAIL || 'REDACTED_EMAIL';
  }

  async sendWelcomeEmail(customer: Customer): Promise<void> {
    const params = {
      Source: this.fromEmail,
      Destination: {
        ToAddresses: [customer.email]
      },
      Message: {
        Subject: {
          Data: 'Welcome to Botsmann!'
        },
        Body: {
          Text: {
            Data: `Hello ${customer.name},\n\nThank you for your interest in Botsmann! We've received your message and will get back to you soon.\n\nBest regards,\nThe Botsmann Team`
          }
        }
      }
    };

    try {
      await this.ses.send(new SendEmailCommand(params));
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }

  async sendAdminNotification(customer: Customer): Promise<void> {
    const params = {
      Source: this.fromEmail,
      Destination: {
        ToAddresses: [this.adminEmail]
      },
      Message: {
        Subject: {
          Data: 'New Customer Registration'
        },
        Body: {
          Text: {
            Data: `New customer registration:\n\nName: ${customer.name}\nEmail: ${customer.email}\nMessage: ${customer.message}\n\nPreferences:\n- Newsletter: ${customer.preferences.newsletter ? 'Yes' : 'No'}\n- Product Updates: ${customer.preferences.productUpdates ? 'Yes' : 'No'}`
          }
        }
      }
    };

    try {
      await this.ses.send(new SendEmailCommand(params));
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      throw error;
    }
  }
}
