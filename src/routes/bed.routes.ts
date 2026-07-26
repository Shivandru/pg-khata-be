import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { BedController } from "../controllers/bed.controller.ts";
import { createBedSchema, updateBedSchema, responseBedSchema, responseBedListSchema } from "../schemas/bed.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

const router = new AppRouter();
const validate = createValidator();
const controller = new BedController();

// Apply RequestLogger and auth middleware to all bed routes
router.use("/", RequestLogger.getMiddleware("Bed"));
router.use("/", authMiddleware);

// Schemas for route parameter validation
const idParamSchema = z.object({
    roomId: id(ID_PREFIXES.room),
    propertyId: id(ID_PREFIXES.property),
});

const idBedsParamSchema = idParamSchema.extend({
    bedId: id(ID_PREFIXES.bed),
});

// Create bed under a room
router.post(
    "/:propertyId/rooms/:roomId/beds",
    validate.params(idParamSchema),
    validate.body(createBedSchema),
    validate.response(responseBedSchema),
    controller.create
);

// Get beds for a room
router.get(
    "/:propertyId/rooms/:roomId/beds",
    validate.params(idParamSchema),
    validate.response(responseBedListSchema),
    controller.getBedsByRoom
);

// Update bed
router.patch(
    "/:propertyId/rooms/:roomId/beds/:bedId",
    validate.params(idBedsParamSchema),
    validate.body(updateBedSchema),
    validate.response(responseBedSchema),
    controller.update
);

// Delete bed
router.delete(
    "/:propertyId/rooms/:roomId/beds/:bedId",
    validate.params(idBedsParamSchema),
    controller.delete
);

export default router;
