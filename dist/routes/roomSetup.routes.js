import { z } from "zod";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createValidator } from "../middlewares/validator.js";
import { createRoomSchema, roomSetupResponseSchema } from "../schemas/room.js";
import { id, ID_PREFIXES } from "../utils/common.js";
import AppRouter from "./AppRouter.js";
export default function createRoomSetupRouter(roomSetupController) {
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
    router.post("/:propertyId", validate.params(propertyIdParamSchema), validate.body(createRoomSchema), validate.response(roomSetupResponseSchema), roomSetupController.setup);
    return router;
}
//# sourceMappingURL=roomSetup.routes.js.map