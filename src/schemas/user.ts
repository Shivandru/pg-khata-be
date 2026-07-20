import { ObjectId } from 'mongodb';
import { z } from 'zod';

const roleEnum = z.enum(['owner', 'guest']); // 'host' joins in Phase 3

const userSchema = z.object({
  userId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  passwordHash: z.string(),
  role: roleEnum,
  propertyId: z.string().optional().nullable().default(null), // set when role === 'owner'
  guestId: z.string().optional().nullable().default(null), // set when role === 'guest' (Phase 2+)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = { userSchema, roleEnum, loginSchema };