import { z } from 'zod';
export declare const tenancySchema: z.ZodObject<{
    tenancyId: z.ZodString;
    propertyId: z.ZodString;
    guestId: z.ZodString;
    roomId: z.ZodString;
    bedId: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const createTenancySchema: z.ZodObject<{
    propertyId: z.ZodString;
    bedId: z.ZodString;
    roomId: z.ZodString;
    startDate: z.ZodString;
}, z.core.$strip>;
export declare const vacateTenancySchema: z.ZodObject<{
    endDate: z.ZodString;
}, z.core.$strip>;
export declare const updateTenancySchema: z.ZodObject<{
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    endDate: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateTenancy = z.infer<typeof updateTenancySchema>;
export type Tenancy = z.infer<typeof tenancySchema>;
export type CreateTenancy = z.infer<typeof createTenancySchema>;
export type VacateTenancy = z.infer<typeof vacateTenancySchema>;
//# sourceMappingURL=tenancy.d.ts.map