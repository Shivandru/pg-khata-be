import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { PropertyController } from "../controllers/property.controller.ts";
import {
  createPropertySchema,
  updatePropertySchema,
  responsePropertySchema,
} from "../schemas/property.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

export default function createPropertyRouter(
  propertyController: PropertyController,
) {
  const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Property"));
  router.use("/", authMiddleware);

  // Schema for route parameter validation
  const propertyIdParamSchema = z.object({
    id: id(ID_PREFIXES.property),
  });

  // Create property
  router.post(
    "/",
    validate.body(createPropertySchema),
    validate.response(responsePropertySchema),
    propertyController.create,
  );

  // Get property by ID
  router.get(
    "/:id",
    validate.params(propertyIdParamSchema),
    validate.response(responsePropertySchema),
    propertyController.getById,
  );

  // Update property by ID
  router.patch(
    "/:id",
    validate.params(propertyIdParamSchema),
    validate.body(updatePropertySchema),
    validate.response(responsePropertySchema),
    propertyController.update,
  );

  return router;
}
