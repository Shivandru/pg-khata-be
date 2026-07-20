import { z } from 'zod';

const guestSchema = z.object({
  guestId: z.string(),
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  kycInfo: z.record(z.string(), z.any()).optional().default({}),
  // Stays null until Phase 2 guest self-service login is introduced.
  // See project plan's "Guest login" decision — Tenancy/PaymentRecord
  // reference guestId directly, so linking a userId later never requires
  // touching those collections.
  userId: z.string().optional().nullable().default(null),
});

const createGuestSchema = guestSchema.omit({ guestId: true, userId: true });

const updateGuestSchema = guestSchema
  .pick({ name: true, phone: true, email: true, kycInfo: true })
  .partial();

module.exports = { guestSchema, createGuestSchema, updateGuestSchema };