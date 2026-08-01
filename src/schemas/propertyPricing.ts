import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

export const propertyPricingSchema = z.object({
  propertyPricingId: id(ID_PREFIXES.propertyPricing),
  propertyId: id(ID_PREFIXES.property),
  bedCount: z.number().int().min(1).max(20),
  rentAmount: z.number().positive(),
});

export const createPropertyPricingSchema = z.array(
  propertyPricingSchema.omit({
    propertyPricingId: true,
    propertyId: true,
  }),
);

export const updatePropertyPricingSchema = propertyPricingSchema
  .pick({ rentAmount: true })
  .partial();

export const responsePropertyPricingSchema = propertyPricingSchema;
export const responsePropertyPricingSchemaList = z.array(propertyPricingSchema);

export type PropertyPricing = z.infer<typeof propertyPricingSchema>;
export type CreatePropertyPricing = z.infer<typeof createPropertyPricingSchema>;
export type UpdatePropertyPricing = z.infer<typeof updatePropertyPricingSchema>;
