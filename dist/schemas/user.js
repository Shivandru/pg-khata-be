import { z } from 'zod';
import { id, ID_PREFIXES } from "../utils/common.js";
export const roleEnum = z.enum(['owner', 'guest']).nullable(); // 'host' joins in Phase 3
export const providerEnum = z.enum(['google']);
export const userSchema = z.object({
    userId: id(ID_PREFIXES.user),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    provider: providerEnum,
    role: roleEnum,
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number').optional(),
    avatar: z.string().url().nullable().optional(),
});
export const createUserSchema = userSchema.omit({
    userId: true,
});
export const updateUserSchema = userSchema
    .pick({
    name: true,
    email: true,
    phone: true,
    avatar: true,
    role: true,
})
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
});
export const googleAuthSchema = z.object({
    idToken: z.string().min(1),
});
export const authResponseSchema = z.object({
    user: userSchema,
    token: z.string(),
});
//# sourceMappingURL=user.js.map