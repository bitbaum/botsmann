import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

const MONGODB_URI = process.env.MONGODB_URI;
let memoryServer: MongoMemoryServer | null = null;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!MONGODB_URI) {
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    cached.promise = mongoose.connect(uri, {});
    cached.conn = await cached.promise;
    mongoose.connection.on('disconnected', async () => {
      if (memoryServer) {
        await memoryServer.stop();
        memoryServer = null;
      }
    });
    return cached.conn;
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
    return mongoose;
  }
}

export async function disconnectDB() {
  if (memoryServer) {
    await mongoose.connection.close();
    await memoryServer.stop();
    memoryServer = null;
  } else if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  cached.conn = null;
  cached.promise = null;
}
