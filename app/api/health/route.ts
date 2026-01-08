import { NextResponse } from 'next/server';

export async function GET() {
  const healthStatus: {
    status: string;
    timestamp: string;
    mongodb?: string;
    uptime: number;
  } = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  // Only check MongoDB if MONGODB_URI is configured
  if (process.env.MONGODB_URI) {
    try {
      const { connectDB } = await import('../../../src/lib/mongodb');
      const conn = await connectDB();
      healthStatus.mongodb = conn.connection.readyState === 1 ? 'connected' : 'disconnected';
    } catch {
      healthStatus.mongodb = 'unavailable';
    }
  } else {
    healthStatus.mongodb = 'not_configured';
  }

  return NextResponse.json(healthStatus, { status: 200 });
}
