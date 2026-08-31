import { z } from 'zod';

export const CustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  // zod v4: .default() now takes the full OUTPUT value; .prefault() keeps the
  // v3 behavior of parsing the fallback through the schema (inner defaults apply).
  preferences: z
    .object({
      newsletter: z.boolean().default(false),
      productUpdates: z.boolean().default(false),
    })
    .prefault({}),
  metadata: z
    .object({
      lastContactDate: z.date().optional(),
      source: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
    .prefault({}),
});

export type Customer = z.infer<typeof CustomerSchema>;
