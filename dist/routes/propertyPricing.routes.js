import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import { PropertyPricingController } from "../controllers/propertyPricing.controller.js";
import { createPropertyPricingSchema, updatePropertyPricingSchema, responsePropertyPricingSchema, responsePropertyPricingSchemaList, } from "../schemas/propertyPricing.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.js";
export default function createPropertyRouter(propertyPricingController) {
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
    });
    // Create property
    router.post("/:propertyId", validate.params(propertyIdParamSchema), validate.body(createPropertyPricingSchema), validate.response(responsePropertyPricingSchemaList), propertyPricingController.create);
    // Get property by ID
    router.get("/:propertyId", validate.params(propertyIdParamSchema), validate.response(responsePropertyPricingSchemaList), propertyPricingController.getPropertyPricing);
    // Update property by ID
    router.patch("/:propertyId/pricing/:propertyPricingId", validate.params(propertyPricingIdParamSchema), validate.body(updatePropertyPricingSchema), validate.response(responsePropertyPricingSchema), propertyPricingController.update);
    return router;
}
//# sourceMappingURL=propertyPricing.routes.js.map