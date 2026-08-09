import { z } from 'zod';
export declare const ownerSchema: z.ZodObject<{
    ownerId: z.ZodString;
    kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    bankDetails: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    userId: z.ZodString;
}, z.core.$strip>;
export declare const createOwnerSchema: z.ZodObject<{
    kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    bankDetails: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.core.$strip>;
export declare const updateOwnerSchema: z.ZodObject<{
    kycInfo: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>>;
    bankDetails: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>>;
}, z.core.$strip>;
export type Owner = z.infer<typeof ownerSchema>;
export type CreateOwner = z.infer<typeof createOwnerSchema>;
export type UpdateOwner = z.infer<typeof updateOwnerSchema>;
//# sourceMappingURL=owner.d.ts.map