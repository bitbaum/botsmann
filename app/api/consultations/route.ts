import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import { Consultation } from '@/src/lib/models/consultation';
import { rateLimit } from '@/src/lib/rate-limit';

const limiter = rateLimit({
  limit: 5, // 5 requests per interval
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    const { isRateLimited } = await limiter.check('CONSULTATION_FORM');
    
    const { name, email, message } = await req.json();
    await connectDB();
    
    const consultation = await Consultation.create({
      name,
      email,
      message,
    });
    
    return NextResponse.json({ success: true, id: consultation._id });
  } catch (error: any) {
    if (error.code === 'RATE_LIMIT') {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation' },
      { status: 500 }
    );
  }
}  