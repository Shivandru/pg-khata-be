import { z } from 'zod';
export declare const propertySchema: z.ZodObject<{
    propertyId: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    ownerId: z.ZodString;
}, z.core.$strip>;
export declare const createPropertySchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
}, z.core.$strip>;
export declare const updatePropertySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const responsePropertySchema: z.ZodObject<{
    propertyId: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    ownerId: z.ZodString;
}, z.core.$strip>;
export type UpdateProperty = z.infer<typeof updatePropertySchema>;
//# sourceMappingURL=property.d.ts.map