import { z } from "zod";
export declare const propertySetupSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    pricing: z.ZodArray<z.ZodObject<{
        bedCount: z.ZodNumber;
        rentAmount: z.ZodNumber;
    }, z.core.$strip>>;
    rooms: z.ZodArray<z.ZodObject<{
        roomNumber: z.ZodString;
        floor: z.ZodNumber;
        bedCount: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const propertySetupResponseSchema: z.ZodObject<{
    property: z.ZodObject<{
        propertyId: z.ZodString;
        name: z.ZodString;
        address: z.ZodString;
        ownerId: z.ZodString;
    }, z.core.$strip>;
    propertyPricing: z.ZodArray<z.ZodObject<{
        propertyPricingId: z.ZodString;
        propertyId: z.ZodString;
        bedCount: z.ZodNumber;
        rentAmount: z.ZodNumber;
    }, z.core.$strip>>;
    rooms: z.ZodArray<z.ZodObject<{
        roomId: z.ZodString;
        propertyId: z.ZodString;
        roomNumber: z.ZodString;
        floor: z.ZodNumber;
        bedCount: z.ZodNumber;
        occupiedCount: z.ZodNumber;
    }, z.core.$strip>>;
    beds: z.ZodArray<z.ZodObject<{
        bedId: z.ZodString;
        roomId: z.ZodString;
        propertyId: z.ZodString;
        label: z.ZodString;
        isOccupied: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PropertySetupRequest = z.infer<typeof propertySetupSchema>;
export type PropertySetupResponse = z.infer<typeof propertySetupResponseSchema>;
//# sourceMappingURL=propertySetup.d.ts.map