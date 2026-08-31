import {
  SignUpSchema,
  SignInSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  UpdateSettingsSchema,
  UpdateProfileSchema,
  PASSWORD_MIN_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
} from '@/lib/schemas/auth';

describe('Auth Schemas', () => {
  describe('SignUpSchema', () => {
    it('accepts valid signup data', () => {
      const result = SignUpSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = SignUpSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('email');
      }
    });

    it('rejects password shorter than minimum length', () => {
      const shortPassword = 'a'.repeat(PASSWORD_MIN_LENGTH - 1);
      const result = SignUpSchema.safeParse({
        email: 'test@example.com',
        password: shortPassword,
        confirmPassword: shortPassword,
      });
      expect(result.success).toBe(false);
    });

    it('rejects mismatched passwords', () => {
      const result = SignUpSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('match');
      }
    });

    it('rejects empty fields', () => {
      const result = SignUpSchema.safeParse({
        email: '',
        password: '',
        confirmPassword: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('SignInSchema', () => {
    it('accepts valid signin data', () => {
      const result = SignInSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = SignInSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty password', () => {
      const result = SignInSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ForgotPasswordSchema', () => {
    it('accepts valid email', () => {
      const result = ForgotPasswordSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = ForgotPasswordSchema.safeParse({
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ResetPasswordSchema', () => {
    it('accepts valid password reset data', () => {
      const result = ResetPasswordSchema.safeParse({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects mismatched passwords', () => {
      const result = ResetPasswordSchema.safeParse({
        password: 'newpassword123',
        confirmPassword: 'different123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short passwords', () => {
      const result = ResetPasswordSchema.safeParse({
        password: 'short',
        confirmPassword: 'short',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('UpdateSettingsSchema', () => {
    it('accepts valid groq settings', () => {
      const result = UpdateSettingsSchema.safeParse({
        preferred_model: 'groq',
        groq_api_key: 'gsk_test_key_123',
      });
      expect(result.success).toBe(true);
    });

    it('accepts valid openrouter settings', () => {
      const result = UpdateSettingsSchema.safeParse({
        preferred_model: 'openrouter',
        openrouter_api_key: 'sk-or-test_key_123',
      });
      expect(result.success).toBe(true);
    });

    it('accepts valid ollama settings', () => {
      const result = UpdateSettingsSchema.safeParse({
        preferred_model: 'ollama',
        ollama_url: 'http://localhost:11434',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid model provider', () => {
      const result = UpdateSettingsSchema.safeParse({
        preferred_model: 'invalid_provider',
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid ollama URL', () => {
      const result = UpdateSettingsSchema.safeParse({
        preferred_model: 'ollama',
        ollama_url: 'not-a-url',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('UpdateProfileSchema', () => {
    it('accepts valid profile data', () => {
      const result = UpdateProfileSchema.safeParse({
        display_name: 'John Doe',
        avatar_url: 'https://example.com/avatar.jpg',
      });
      expect(result.success).toBe(true);
    });

    it('accepts profile with only display name', () => {
      const result = UpdateProfileSchema.safeParse({
        display_name: 'Jane',
      });
      expect(result.success).toBe(true);
    });

    it('accepts null avatar_url', () => {
      const result = UpdateProfileSchema.safeParse({
        display_name: 'Test',
        avatar_url: null,
      });
      expect(result.success).toBe(true);
    });

    it('rejects display name exceeding max length', () => {
      const longName = 'a'.repeat(DISPLAY_NAME_MAX_LENGTH + 1);
      const result = UpdateProfileSchema.safeParse({
        display_name: longName,
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid avatar URL', () => {
      const result = UpdateProfileSchema.safeParse({
        display_name: 'Test',
        avatar_url: 'not-a-url',
      });
      expect(result.success).toBe(false);
    });
  });
});
