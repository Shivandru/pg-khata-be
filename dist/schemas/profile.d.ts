import { z } from "zod";
export declare const profileResponseSchema: z.ZodUnion<readonly [z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodLiteral<"guest">;
    guestProfile: z.ZodObject<{
        guestId: z.ZodString;
        kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        userId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodLiteral<"owner">;
    ownerProfile: z.ZodObject<{
        ownerId: z.ZodString;
        kycInfo: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        bankDetails: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        userId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodNull;
}, z.core.$strip>]>;
export type Profile = z.infer<typeof profileResponseSchema>;
//# sourceMappingURL=profile.d.ts.map