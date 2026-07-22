import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const roleEnum = z.enum(['owner', 'guest']); // 'host' joins in Phase 3

export const userSchema = z.object({
  userId: id(ID_PREFIXES.user),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  passwordHash: z.string(),
  role: roleEnum,
  propertyId: id(ID_PREFIXES.property).nullable().default(null), // set when role === 'owner'
  guestId: id(ID_PREFIXES.guest).nullable().default(null), // set when role === 'guest' (Phase 2+)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});