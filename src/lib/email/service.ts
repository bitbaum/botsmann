import sgMail from '@sendgrid/mail';
import { Customer } from '../schemas/customer';

export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendWelcomeEmail(customer: Customer): Promise<void> {
    try {
      await sgMail.send({
        to: customer.email,
        from: process.env.EMAIL_FROM!,
        templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID!,
        dynamicTemplateData: {
          name: customer.name,
          preferences: customer.preferences,
          dashboardUrl: process.env.DASHBOARD_URL,
        },
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  async sendAdminNotification(customer: Customer): Promise<void> {
    try {
      await sgMail.send({
        to: process.env.ADMIN_EMAIL!,
        from: process.env.EMAIL_FROM!,
        subject: 'New Customer Registration',
        text: `
New customer registration:
Name: ${customer.name}
Email: ${customer.email}
Message: ${customer.message}
Preferences: ${JSON.stringify(customer.preferences)}
Metadata: ${JSON.stringify(customer.metadata)}
        `.trim(),
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      // Don't throw error for admin notifications
    }
  }
}
