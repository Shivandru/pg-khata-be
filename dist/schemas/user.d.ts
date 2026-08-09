import { z } from 'zod';
export declare const roleEnum: z.ZodNullable<z.ZodEnum<{
    guest: "guest";
    owner: "owner";
}>>;
export declare const providerEnum: z.ZodEnum<{
    google: "google";
}>;
export type Provider = z.infer<typeof providerEnum>;
export type Role = z.infer<typeof roleEnum>;
export declare const userSchema: z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    role: z.ZodNullable<z.ZodEnum<{
        guest: "guest";
        owner: "owner";
    }>>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    role: z.ZodNullable<z.ZodEnum<{
        guest: "guest";
        owner: "owner";
    }>>;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        guest: "guest";
        owner: "owner";
    }>>>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatar: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strict>;
export declare const googleAuthSchema: z.ZodObject<{
    idToken: z.ZodString;
}, z.core.$strip>;
export declare const authResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        userId: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        provider: z.ZodEnum<{
            google: "google";
        }>;
        role: z.ZodNullable<z.ZodEnum<{
            guest: "guest";
            owner: "owner";
        }>>;
        phone: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    token: z.ZodString;
}, z.core.$strip>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
//# sourceMappingURL=user.d.ts.map