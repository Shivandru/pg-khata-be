import { z } from 'zod';
import { id, ID_PREFIXES } from "../utils/common.js";
// Full shape — what a Property looks like once read from the DB
export const propertySchema = z.object({
    propertyId: id(ID_PREFIXES.property),
    name: z.string().min(2).max(100),
    address: z.string().min(5).max(300),
    ownerId: id(ID_PREFIXES.owner),
});
// What the API accepts on create.
// ownerId is NOT in the request body — it comes from the authenticated user (req.user.id),
// never trust the client to tell you who the owner is.
export const createPropertySchema = propertySchema.omit({ propertyId: true, ownerId: true });
// What the API accepts on update — only these fields are ever editable
export const updatePropertySchema = propertySchema
    .pick({ name: true, address: true })
    .partial();
// What the API returns in responses
export const responsePropertySchema = propertySchema;
//# sourceMappingURL=property.js.map