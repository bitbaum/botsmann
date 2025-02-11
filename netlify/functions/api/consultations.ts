import { Handler } from '@netlify/functions';
import { connectDB } from '../../../src/lib/mongodb';
import { Consultation } from '../../../src/lib/models/consultation';
import { CustomerSchema } from '../../../src/lib/schemas/customer';
import { EmailService } from '../../../src/lib/email/service';
import { validateApiKey } from '../../../src/lib/middleware/auth';
import { monitorRequest } from '../../../src/lib/middleware/monitoring';

const emailService = new EmailService();

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validatedData = CustomerSchema.parse(body);
    
    if (process.env.NODE_ENV !== 'test') {
      await connectDB();
    }
    
    const consultation = await Consultation.create(validatedData);

    // Send emails asynchronously
    try {
      await Promise.all([
        emailService.sendWelcomeEmail(validatedData),
        emailService.sendAdminNotification(validatedData),
      ]);
    } catch (emailError) {
      console.error('Failed to send emails:', emailError);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: consultation._id }),
    };
  } catch (error: any) {
    console.error('Consultation submission error:', error);
    return {
      statusCode: error.code === 'VALIDATION_ERROR' ? 400 : 500,
      body: JSON.stringify({ 
        error: error.message || 'Failed to submit consultation'
      }),
    };
  }
};
