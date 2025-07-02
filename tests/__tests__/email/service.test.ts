import { EmailService } from "@/src/lib/email/service";
import { CustomerSchema } from "@/src/lib/schemas/customer";

describe("EmailService", () => {
  let emailService: EmailService;

  beforeEach(() => {
    // Set test environment variables required by EmailService
    process.env.NEXT_AWS_ACCESS_KEY_ID = "test_key";
    process.env.NEXT_AWS_SECRET_ACCESS_KEY = "test_secret";
    process.env.FROM_EMAIL = "test@example.com";
    process.env.ADMIN_EMAIL = "admin@example.com";
    emailService = new EmailService();
  });

  afterEach(() => {
    delete process.env.NEXT_AWS_ACCESS_KEY_ID;
    delete process.env.NEXT_AWS_SECRET_ACCESS_KEY;
    delete process.env.FROM_EMAIL;
    delete process.env.ADMIN_EMAIL;
  });

  it("sends welcome email", async () => {
    const customer = CustomerSchema.parse({
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
      preferences: {
        newsletter: true,
        productUpdates: true,
      },
    });

    await expect(
      emailService.sendWelcomeEmail(customer),
    ).resolves.not.toThrow();
  });

  it("sends admin notification", async () => {
    const customer = CustomerSchema.parse({
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
      preferences: {
        newsletter: true,
        productUpdates: false,
      },
    });

    await expect(
      emailService.sendAdminNotification(customer),
    ).resolves.not.toThrow();
  });

  it("handles missing environment variables", async () => {
    delete process.env.NEXT_AWS_ACCESS_KEY_ID;
    const service = new EmailService();
    const customer = CustomerSchema.parse({
      name: "Missing Env",
      email: "test@example.com",
      message: "Hi",
      preferences: { newsletter: false, productUpdates: false },
    });
    await expect(service.sendWelcomeEmail(customer)).resolves.not.toThrow();
  });

  it("handles invalid customer data", async () => {
    await expect(
      CustomerSchema.parseAsync({
        name: "",
        email: "invalid-email",
        message: "",
      }),
    ).rejects.toThrow();
  });
});
