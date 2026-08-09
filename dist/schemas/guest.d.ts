import { z } from 'zod';
export declare const guestSchema: z.ZodObject<{
    guestId: z.ZodString;
    kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    userId: z.ZodString;
}, z.core.$strip>;
export declare const createGuestSchema: z.ZodObject<{
    kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.core.$strip>;
export declare const updateGuestSchema: z.ZodObject<{
    kycInfo: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>>;
}, z.core.$strip>;
export declare const registerGuestSchema: z.ZodObject<{}, z.core.$strip>;
export declare const guestListSchema: z.ZodObject<{
    guestId: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const guestListResponseSchema: z.ZodArray<z.ZodObject<{
    guestId: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>>;
export type GuestList = z.infer<typeof guestListSchema>;
export type Guest = z.infer<typeof guestSchema>;
export type CreateGuest = z.infer<typeof createGuestSchema>;
export type UpdateGuest = z.infer<typeof updateGuestSchema>;
//# sourceMappingURL=guest.d.ts.map