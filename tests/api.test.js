const request = require("supertest");
const baseURL = process.env.NETLIFY_URL || "http://localhost:3000";

describe("API Tests", () => {
  test("POST /api/consultations with valid data", async () => {
    const response = await request(baseURL).post("/api/consultations").send({
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("POST /api/consultations with missing data", async () => {
    const response = await request(baseURL).post("/api/consultations").send({
      name: "Test User",
      // missing email and message
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});
