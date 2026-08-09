import { z } from "zod";
import { userSchema } from "./user.js";
import { guestSchema } from "./guest.js";
import { ownerSchema } from "./owner.js";
const guestProfileSchema = userSchema.extend({
    role: z.literal("guest"),
    guestProfile: guestSchema,
});
const ownerProfileSchema = userSchema.extend({
    role: z.literal("owner"),
    ownerProfile: ownerSchema,
});
const pendingProfileSchema = userSchema.extend({
    role: z.null(),
});
export const profileResponseSchema = z.union([
    guestProfileSchema,
    ownerProfileSchema,
    pendingProfileSchema,
]);
//# sourceMappingURL=profile.js.map