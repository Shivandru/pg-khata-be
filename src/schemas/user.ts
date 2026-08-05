import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const roleEnum = z.enum(['owner', 'guest']); // 'host' joins in Phase 3
export const providerEnum = z.enum(['google']);
export type Provider = z.infer<typeof providerEnum>;
export type Role = z.infer<typeof roleEnum>;

export const userSchema = z.object({
  userId: id(ID_PREFIXES.user),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  provider: providerEnum,
  role: roleEnum,
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number').optional(),
});

export const createUserSchema = userSchema.omit({
  userId: true,
});

export const updateUserSchema = userSchema
  .pick({
    name: true,
    email: true,
    phone: true,
  })
  .partial()
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided.",
    }
  );

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;



