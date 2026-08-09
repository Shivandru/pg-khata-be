import { z } from "zod";
import { propertySchema } from "./property.js";
import { responsePropertyPricingSchemaList } from "./propertyPricing.js";
import { responseRoomListSchema } from "./room.js";
import { responseBedListSchema } from "./bed.js";
export const propertySetupSchema = z.object({
    name: z.string().min(2).max(100),
    address: z.string().min(5).max(300),
    pricing: z.array(z.object({
        bedCount: z.number().int().min(1).max(20),
        rentAmount: z.number().positive(),
    })).min(1),
    rooms: z.array(z.object({
        roomNumber: z.string().min(1).max(20),
        floor: z.number().int().min(0).max(50),
        bedCount: z.number().int().min(1).max(20),
    })).min(1),
});
export const propertySetupResponseSchema = z.object({
    property: propertySchema,
    propertyPricing: responsePropertyPricingSchemaList,
    rooms: responseRoomListSchema,
    beds: responseBedListSchema,
});
//# sourceMappingURL=propertySetup.js.map