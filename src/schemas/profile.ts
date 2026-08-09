import { z } from "zod";
import { userSchema } from "./user.ts";
import { guestSchema } from "./guest.ts";
import { ownerSchema } from "./owner.ts";

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

export type Profile = z.infer<typeof profileResponseSchema>;