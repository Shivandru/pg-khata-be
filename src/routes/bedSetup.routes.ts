import { z } from "zod";
import type { BedSetupController } from "../controllers/bedSetup.controller.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { createValidator } from "../middlewares/validator.ts";
import { createBedSchema, responseBedSchema } from "../schemas/bed.ts";
import { id, ID_PREFIXES } from "../utils/common.ts";
import AppRouter from "./AppRouter.ts";

export default function createBedSetupRouter(
  bedSetupController: BedSetupController,
) {
  const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all routes
  router.use("/", RequestLogger.getMiddleware("Bed Setup"));
  router.use("/", authMiddleware);

  // Schema for route parameter validation
  const roomIdParamSchema = z.object({
    propertyId: id(ID_PREFIXES.property),
    roomId: id(ID_PREFIXES.room),
  });

  // Create Room
  router.post(
    "/:propertyId/rooms/:roomId",
    validate.params(roomIdParamSchema),
    validate.body(createBedSchema),
    validate.response(responseBedSchema),
    bedSetupController.setup,
  );

  return router;
}
