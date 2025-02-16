import mongoose from 'mongoose';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is required');
  }

  const opts = {
    bufferCommands: false,
    maxPoolSize: 5, // Reduced for serverless
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    family: 4,
    retryWrites: true,
    retryReads: true,
    w: 'majority',
    keepAlive: true,
    keepAliveInitialDelay: 300000
  };
  
  try {
    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
