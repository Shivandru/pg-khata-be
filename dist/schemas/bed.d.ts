import { z } from 'zod';
export declare const bedSchema: z.ZodObject<{
    bedId: z.ZodString;
    roomId: z.ZodString;
    propertyId: z.ZodString;
    label: z.ZodString;
    isOccupied: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const createBedSchema: z.ZodObject<{}, z.core.$strict>;
export declare const updateBedSchema: z.ZodObject<{
    isOccupied: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const responseBedSchema: z.ZodObject<{
    bedId: z.ZodString;
    roomId: z.ZodString;
    propertyId: z.ZodString;
    label: z.ZodString;
    isOccupied: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type UpdateBed = z.infer<typeof updateBedSchema>;
export type CreateBed = z.infer<typeof createBedSchema>;
export type Bed = z.infer<typeof bedSchema>;
export declare const responseBedListSchema: z.ZodArray<z.ZodObject<{
    bedId: z.ZodString;
    roomId: z.ZodString;
    propertyId: z.ZodString;
    label: z.ZodString;
    isOccupied: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>>;
export type BedList = z.infer<typeof responseBedListSchema>;
//# sourceMappingURL=bed.d.ts.map