import { z } from 'zod';
import { id, ID_PREFIXES } from "../utils/common.js";
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
//# sourceMappingURL=owner.js.map