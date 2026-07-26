import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const roleEnum = z.enum(['owner', 'guest']); // 'host' joins in Phase 3
export type Role = z.infer<typeof roleEnum>;

export const userSchema = z.object({
  userId: id(ID_PREFIXES.user),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string(),
  role: roleEnum,
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  guestId: id(ID_PREFIXES.guest).nullable().default(null), // set when role === 'guest' (Phase 2+)
});

export const createUserSchema = userSchema.omit({
  userId: true,
  guestId: true,
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

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;



