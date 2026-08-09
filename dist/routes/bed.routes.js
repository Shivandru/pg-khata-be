import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import { createBedSchema, updateBedSchema, responseBedSchema, responseBedListSchema } from "../schemas/bed.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.js";
export default function createBedRouter(bedController) {
    const router = new AppRouter();
    const validate = createValidator();
    router.use("/", RequestLogger.getMiddleware("Bed"));
    router.use("/", authMiddleware);
    const idParamSchema = z.object({
        roomId: id(ID_PREFIXES.room),
        propertyId: id(ID_PREFIXES.property),
    });
    const idBedsParamSchema = idParamSchema.extend({
        bedId: id(ID_PREFIXES.bed),
    });
    router.post("/:propertyId/rooms/:roomId/beds", validate.params(idParamSchema), validate.body(createBedSchema), validate.response(responseBedSchema), bedController.create);
    router.get("/:propertyId/rooms/:roomId/beds", validate.params(idParamSchema), validate.response(responseBedListSchema), bedController.getBedsByRoom);
    router.patch("/:propertyId/rooms/:roomId/beds/:bedId", validate.params(idBedsParamSchema), validate.body(updateBedSchema), validate.response(responseBedSchema), bedController.update);
    router.delete("/:propertyId/rooms/:roomId/beds/:bedId", validate.params(idBedsParamSchema), bedController.delete);
    return router;
}
//# sourceMappingURL=bed.routes.js.map