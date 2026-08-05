import { z } from 'zod';
import { id, ID_PREFIXES, dateOnly } from '../utils/common.ts';

export const tenancySchema = z.object({
  tenancyId: id(ID_PREFIXES.tenancy),
  propertyId: id(ID_PREFIXES.property),
  guestId: id(ID_PREFIXES.guest),
  roomId: id(ID_PREFIXES.room),
  bedId: id(ID_PREFIXES.bed),
  startDate: dateOnly,
  endDate: dateOnly.nullable().default(null),
  isActive: z.boolean().default(true),
});

// What POST /tenancies accepts — endDate and isActive are system-managed,
// never set directly by the client
export const createTenancySchema = tenancySchema.omit({
  tenancyId: true,
  guestId: true,
  endDate: true,
  isActive: true,
});

// What PUT /tenancies/:id/vacate accepts
export const vacateTenancySchema = z.object({
  endDate: dateOnly,
});

export const updateTenancySchema = tenancySchema
  .pick({
    endDate: true,
    isActive: true,
  })
  .partial();

export type UpdateTenancy = z.infer<typeof updateTenancySchema>;
export type Tenancy = z.infer<typeof tenancySchema>;
export type CreateTenancy = z.infer<typeof createTenancySchema>;
export type VacateTenancy = z.infer<typeof vacateTenancySchema>;