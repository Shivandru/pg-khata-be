import { z } from "zod";
import type { RoomSetupController } from "../controllers/roomSetup.controller.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { createValidator } from "../middlewares/validator.ts";
import { createRoomSchema, roomSetupResponseSchema } from "../schemas/room.ts";
import { id, ID_PREFIXES } from "../utils/common.ts";
import AppRouter from "./AppRouter.ts";

export default function createRoomSetupRouter(
  roomSetupController: RoomSetupController,
) {
  const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all routes
  router.use("/", RequestLogger.getMiddleware("Room Setup"));
  router.use("/", authMiddleware);

  // Schema for route parameter validation
  const propertyIdParamSchema = z.object({
    propertyId: id(ID_PREFIXES.property),
  });

  // Create Room
  router.post(
    "/:propertyId",
    validate.params(propertyIdParamSchema),
    validate.body(createRoomSchema),
    validate.response(roomSetupResponseSchema),
    roomSetupController.setup,
  );

  return router;
}
