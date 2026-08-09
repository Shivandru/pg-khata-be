import { z } from 'zod';
export declare const ID_PREFIXES: {
    property: string;
    room: string;
    bed: string;
    guest: string;
    tenancy: string;
    payment: string;
    user: string;
    propertyPricing: string;
    owner: string;
};
type PrefixValue = (typeof ID_PREFIXES)[keyof typeof ID_PREFIXES];
/**
 * Builds a Zod validator for a prefixed ID string, e.g. id('p') validates "p-3f2504e0".
 * We use these instead of MongoDB's default _id / ObjectId so IDs stay short,
 * human-readable, and self-describing in logs, URLs, and support conversations.
 */
export declare function id(prefix: PrefixValue): z.ZodString;
/**
 * Generates a prefixed ID, e.g. generateId(ID_PREFIXES.property) -> "p-3f2504e0".
 * Uses the first segment of a v4 UUID (8 hex chars) for a short, still-effectively-unique suffix.
 * Call this in the repository layer right before inserting a new document —
 * never let the client supply an ID.
 */
export declare function generateId(prefix: PrefixValue): string;
export declare const dateOnly: z.ZodString;
export declare const monthOnly: z.ZodString;
export {};
//# sourceMappingURL=common.d.ts.map