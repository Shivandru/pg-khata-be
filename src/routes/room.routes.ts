import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { RoomController } from "../controllers/room.controller.ts";
import { createRoomSchema, updateRoomSchema, responseRoomSchema, responseRoomListSchema } from "../schemas/room.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

const router = new AppRouter();
const validate = createValidator();
const controller = new RoomController();

// Apply RequestLogger and auth middleware to all room routes
router.use("/", RequestLogger.getMiddleware("Room"));
router.use("/", authMiddleware);

// Schemas for route parameter validation
const propertyIdParamSchema = z.object({
    propertyId: id(ID_PREFIXES.property),
});

const roomIdParamSchema = z.object({
    id: id(ID_PREFIXES.room),
});

// Create room under a property
router.post(
    "/properties/:propertyId/rooms",
    validate.params(propertyIdParamSchema),
    validate.body(createRoomSchema),
    validate.response(responseRoomSchema),
    controller.create
);

// Get rooms for a property
router.get(
    "/properties/:propertyId/rooms",
    validate.params(propertyIdParamSchema),
    validate.response(responseRoomListSchema),
    controller.getRoomsByProperty
);

// Update room
router.put(
    "/rooms/:id",
    validate.params(roomIdParamSchema),
    validate.body(updateRoomSchema),
    validate.response(responseRoomSchema),
    controller.update
);

// Delete room
router.delete(
    "/rooms/:id",
    validate.params(roomIdParamSchema),
    controller.delete
);

export default router;
