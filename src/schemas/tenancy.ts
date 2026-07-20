import { z } from 'zod';

const tenancySchema = z.object({
  tenancyId: z.string(),
  guestId: z.string().min(2),
  bedId: z.string().min(2),
  startDate: z.date(),
  endDate: z.date().nullable().default(null),
  agreedRent: z.number().positive(),
  isActive: z.boolean().default(true),
});

// What POST /tenancies accepts — endDate and isActive are system-managed,
// never set directly by the client
const createTenancySchema = tenancySchema.omit({
  tenancyId: true,
  endDate: true,
  isActive: true,
});

// What PUT /tenancies/:id/vacate accepts
const vacateTenancySchema = z.object({
  endDate: z.date(),
});

module.exports = { tenancySchema, createTenancySchema, vacateTenancySchema };