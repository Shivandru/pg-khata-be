import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import { PropertyController } from "../controllers/property.controller.js";
import { createPropertySchema, updatePropertySchema, responsePropertySchema, } from "../schemas/property.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.js";
export default function createPropertyRouter(propertyController) {
    const router = new AppRouter();
    const validate = createValidator();
    // Apply RequestLogger and auth middleware to all property routes
    router.use("/", RequestLogger.getMiddleware("Property"));
    router.use("/", authMiddleware);
    // Schema for route parameter validation
    const propertyIdParamSchema = z.object({
        id: id(ID_PREFIXES.property),
    });
    // Get all properties
    router.get("/", validate.response(z.array(responsePropertySchema)), propertyController.getAll);
    // Create property
    router.post("/", validate.body(createPropertySchema), validate.response(responsePropertySchema), propertyController.create);
    // Get owner's own property
    router.get("/me", validate.response(responsePropertySchema.nullable()), propertyController.getByOwner);
    // Get property by ID
    router.get("/:id", validate.params(propertyIdParamSchema), validate.response(responsePropertySchema), propertyController.getById);
    // Update property by ID
    router.patch("/:id", validate.params(propertyIdParamSchema), validate.body(updatePropertySchema), validate.response(responsePropertySchema), propertyController.update);
    return router;
}
//# sourceMappingURL=property.routes.js.map