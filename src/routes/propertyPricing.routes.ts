import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { PropertyPricingController } from "../controllers/propertyPricing.controller.ts";
import {
    createPropertyPricingSchema,
    updatePropertyPricingSchema,
    responsePropertyPricingSchema,
    responsePropertyPricingSchemaList,
} from "../schemas/propertyPricing.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

export default function createPropertyRouter(
  propertyPricingController: PropertyPricingController,
) {
  const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Property Pricing"));
  router.use("/", authMiddleware);

  // Schema for route parameter validation
  const propertyIdParamSchema = z.object({
    propertyId: id(ID_PREFIXES.property),
  });

  const propertyPricingIdParamSchema = z.object({
    propertyId: id(ID_PREFIXES.property),
    propertyPricingId: id(ID_PREFIXES.propertyPricing),
  })

  // Create property
  router.post(
    "/:propertyId",
    validate.params(propertyIdParamSchema),
    validate.body(createPropertyPricingSchema),
    validate.response(responsePropertyPricingSchemaList),
    propertyPricingController.create,
  );

  // Get property by ID
  router.get(
    "/:propertyId",
    validate.params(propertyIdParamSchema),
    validate.response(responsePropertyPricingSchemaList),
    propertyPricingController.getPropertyPricing,
  );

  // Update property by ID
  router.patch(
    "/:propertyId/pricing/:propertyPricingId",
    validate.params(propertyPricingIdParamSchema),
    validate.body(updatePropertyPricingSchema),
    validate.response(responsePropertyPricingSchema),
    propertyPricingController.update,
  );

  return router;
}
