import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/dist/lib/client';

export class EmailService {
  private client: Client;
  private domain: string;
  private fromEmail: string;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.client = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || '',
      url: 'https://api.eu.mailgun.net'  // EU endpoint for Swiss compliance
    });
    this.domain = process.env.MAILGUN_DOMAIN || '';
    this.fromEmail = process.env.MAILGUN_FROM_EMAIL || '';
  }

  async sendWelcomeEmail(customer: any) {
    try {
      await this.client.messages.create(this.domain, {
        from: this.fromEmail,
        to: customer.email,
        subject: 'Welcome to Botsmann!',
        template: 'welcome-email',
        'h:X-Mailgun-Variables': JSON.stringify({
          name: customer.name,
          preferences: customer.preferences || {},
          dashboardUrl: process.env.DASHBOARD_URL
        })
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }

  async sendAdminNotification(customer: any) {
    try {
      await this.client.messages.create(this.domain, {
        from: this.fromEmail,
        to: process.env.ADMIN_EMAIL || '',
        subject: 'New Customer Registration',
        text: `
New customer registration:
Name: ${customer.name}
Email: ${customer.email}
Message: ${customer.message}
Preferences:
- Newsletter: ${customer.preferences?.newsletter ? 'Yes' : 'No'}
- Product Updates: ${customer.preferences?.productUpdates ? 'Yes' : 'No'}
`
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }
  }
}
