import mongoose from "mongoose";
import { createMocks } from "node-mocks-http";
import { POST } from "@/app/api/consultations/route";
import { connectDB } from "@/src/lib/mongodb";
import { Consultation } from "@/src/lib/models/consultation";

const describeIfDB = process.env.MONGODB_URI ? describe : describe.skip;

describeIfDB("Consultations API", () => {
  beforeAll(async () => {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not set, skipping DB tests");
      return;
    }
    await connectDB();
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  beforeEach(async () => {
    if (!process.env.MONGODB_URI) {
      return;
    }
    await Consultation.deleteMany({});
  });

  const maybeIt = process.env.MONGODB_URI ? it : it.skip;
  maybeIt("creates a consultation", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
      },
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();

    const consultation = await Consultation.findById(data.id);
    expect(consultation).toBeDefined();
    expect(consultation.name).toBe("Test User");
    expect(consultation.email).toBe("test@example.com");
    expect(consultation.message).toBe("Test message");
    expect(consultation.status).toBe("new");
  });
});
