import { z } from 'zod';
import { id, ID_PREFIXES } from "../utils/common.js";
export const guestSchema = z.object({
    guestId: id(ID_PREFIXES.guest),
    kycInfo: z.record(z.string(), z.any()).optional().default({}),
    userId: id(ID_PREFIXES.user),
});
export const createGuestSchema = guestSchema.omit({ guestId: true, userId: true });
export const updateGuestSchema = guestSchema
    .pick({ kycInfo: true })
    .partial();
export const registerGuestSchema = z.object({
// phone: z.string().regex(/^[6-9]\d{9}$/),
});
export const guestListSchema = z.object({
    guestId: id(ID_PREFIXES.guest),
    userId: id(ID_PREFIXES.user),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    avatar: z.string().nullable().optional(),
});
export const guestListResponseSchema = z.array(guestListSchema);
//# sourceMappingURL=guest.js.map