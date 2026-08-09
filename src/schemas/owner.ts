import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const ownerSchema = z.object({
  ownerId: id(ID_PREFIXES.owner),
  kycInfo: z.record(z.string(), z.any()).optional().default({}),
  bankDetails: z.record(z.string(), z.any()).optional().default({}),
  userId: id(ID_PREFIXES.user),
});

export const createOwnerSchema = ownerSchema.omit({ ownerId: true, userId: true });

export const updateOwnerSchema = ownerSchema
  .pick({ kycInfo: true, bankDetails: true })
  .partial();

export type Owner = z.infer<typeof ownerSchema>;
export type CreateOwner = z.infer<typeof createOwnerSchema>;
export type UpdateOwner = z.infer<typeof updateOwnerSchema>;