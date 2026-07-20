import { z } from 'zod';


// Full shape — what a Property looks like once read from the DB
const propertySchema = z.object({
  propertyId: z.string(),
  name: z.string().min(2).max(100),
  address: z.string().min(5).max(300),
  ownerId: z.string(),
});

// What the API accepts on create.
// ownerId is NOT in the request body — it comes from the authenticated user (req.user.id),
// never trust the client to tell you who the owner is.
const createPropertySchema = propertySchema.omit({ propertyId: true, ownerId: true });

// What the API accepts on update — only these fields are ever editable
const updatePropertySchema = propertySchema
  .pick({ name: true, address: true })
  .partial();

module.exports = { propertySchema, createPropertySchema, updatePropertySchema };