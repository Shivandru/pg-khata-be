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
const roomIdParamSchema = z.object({
    roomId: id(ID_PREFIXES.room),
});

const bedIdParamSchema = z.object({
    id: id(ID_PREFIXES.bed),
});

// Create bed under a room
router.post(
    "/rooms/:roomId/beds",
    validate.params(roomIdParamSchema),
    validate.body(createBedSchema),
    validate.response(responseBedSchema),
    controller.create
);

// Get beds for a room
router.get(
    "/rooms/:roomId/beds",
    validate.params(roomIdParamSchema),
    validate.response(responseBedListSchema),
    controller.getBedsByRoom
);

// Update bed
router.put(
    "/beds/:id",
    validate.params(bedIdParamSchema),
    validate.body(updateBedSchema),
    validate.response(responseBedSchema),
    controller.update
);

// Delete bed
router.delete(
    "/beds/:id",
    validate.params(bedIdParamSchema),
    controller.delete
);

export default router;
