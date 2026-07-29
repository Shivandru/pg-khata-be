import { z } from 'zod';
import { id, ID_PREFIXES } from '../utils/common.ts';

export const propertyPricingSchema = z.object({
    propertyPricingId: id(ID_PREFIXES.propertyPricing),
    propertyId: id(ID_PREFIXES.property),
    bedCount: z.number().int().min(1).max(20),
    rentAmount: z.number().positive(),
});

export const createPropertyPricingSchema = propertyPricingSchema.omit({ propertyPricingId: true });

export const updatePropertyPricingSchema = propertyPricingSchema
  .pick({ rentAmount: true })
  .partial();

export type PropertyPricing = z.infer<typeof propertyPricingSchema>;
export type CreatePropertyPricing = z.infer<typeof createPropertyPricingSchema>;
export type UpdatePropertyPricing = z.infer<typeof updatePropertyPricingSchema>;