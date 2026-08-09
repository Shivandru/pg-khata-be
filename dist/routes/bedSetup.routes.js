import { z } from "zod";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createValidator } from "../middlewares/validator.js";
import { createBedSchema, responseBedSchema } from "../schemas/bed.js";
import { id, ID_PREFIXES } from "../utils/common.js";
import AppRouter from "./AppRouter.js";
export default function createBedSetupRouter(bedSetupController) {
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
    router.post("/:propertyId/rooms/:roomId", validate.params(roomIdParamSchema), validate.body(createBedSchema), validate.response(responseBedSchema), bedSetupController.setup);
    return router;
}
//# sourceMappingURL=bedSetup.routes.js.map