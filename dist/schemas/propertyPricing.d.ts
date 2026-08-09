import { z } from "zod";
export declare const propertyPricingSchema: z.ZodObject<{
    propertyPricingId: z.ZodString;
    propertyId: z.ZodString;
    bedCount: z.ZodNumber;
    rentAmount: z.ZodNumber;
}, z.core.$strip>;
export declare const createPropertyPricingSchema: z.ZodArray<z.ZodObject<{
    bedCount: z.ZodNumber;
    rentAmount: z.ZodNumber;
}, z.core.$strip>>;
export declare const updatePropertyPricingSchema: z.ZodObject<{
    rentAmount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const responsePropertyPricingSchema: z.ZodObject<{
    propertyPricingId: z.ZodString;
    propertyId: z.ZodString;
    bedCount: z.ZodNumber;
    rentAmount: z.ZodNumber;
}, z.core.$strip>;
export declare const responsePropertyPricingSchemaList: z.ZodArray<z.ZodObject<{
    propertyPricingId: z.ZodString;
    propertyId: z.ZodString;
    bedCount: z.ZodNumber;
    rentAmount: z.ZodNumber;
}, z.core.$strip>>;
export type PropertyPricing = z.infer<typeof propertyPricingSchema>;
export type CreatePropertyPricing = z.infer<typeof createPropertyPricingSchema>;
export type UpdatePropertyPricing = z.infer<typeof updatePropertyPricingSchema>;
//# sourceMappingURL=propertyPricing.d.ts.map