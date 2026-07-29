import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { createBedSchema, updateBedSchema, responseBedSchema, responseBedListSchema } from "../schemas/bed.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";
import type { BedController } from "../controllers/bed.controller.ts";

export default function createBedRouter(
    bedController: BedController
) {
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

    router.post(
        "/:propertyId/rooms/:roomId/beds",
        validate.params(idParamSchema),
        validate.body(createBedSchema),
        validate.response(responseBedSchema),
        bedController.create
    );

    router.get(
        "/:propertyId/rooms/:roomId/beds",
        validate.params(idParamSchema),
        validate.response(responseBedListSchema),
        bedController.getBedsByRoom
    );

    router.patch(
        "/:propertyId/rooms/:roomId/beds/:bedId",
        validate.params(idBedsParamSchema),
        validate.body(updateBedSchema),
        validate.response(responseBedSchema),
        bedController.update
    );

    router.delete(
        "/:propertyId/rooms/:roomId/beds/:bedId",
        validate.params(idBedsParamSchema),
        bedController.delete
    );

    return router;
}
