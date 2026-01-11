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

const globalWithMongoose = global as typeof globalThis & { mongoose: GlobalMongoose };
const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is required');
  }

  const opts: mongoose.ConnectOptions = {
    bufferCommands: false,
    maxPoolSize: 5, // Reduced for serverless
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    family: 4,
    connectTimeoutMS: 10000,
    heartbeatFrequencyMS: 30000
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
