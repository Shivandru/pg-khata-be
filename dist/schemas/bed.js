import { z } from 'zod';
import { id, ID_PREFIXES } from "../utils/common.js";
export const bedSchema = z.object({
    bedId: id(ID_PREFIXES.bed),
    roomId: id(ID_PREFIXES.room),
    propertyId: id(ID_PREFIXES.property),
    label: z.string().min(1).max(10), // e.g. "A", "B", "1"
    isOccupied: z.boolean().default(false),
});
export const createBedSchema = bedSchema
    .pick({})
    .strict();
export const updateBedSchema = bedSchema
    .pick({ isOccupied: true })
    .partial();
export const responseBedSchema = bedSchema;
export const responseBedListSchema = z.array(bedSchema);
//# sourceMappingURL=bed.js.map