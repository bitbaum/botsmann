import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  preferences: z
    .object({
      newsletter: z.boolean().default(false),
      productUpdates: z.boolean().default(false),
    })
    .default({}),
  metadata: z
    .object({
      lastContactDate: z.date().optional(),
      source: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
    .default({}),
});

export type Customer = z.infer<typeof CustomerSchema>;
