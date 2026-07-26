import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import { PropertyController } from "../controllers/property.controller.ts";
import { createPropertySchema, updatePropertySchema, responsePropertySchema } from "../schemas/property.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";

const router = new AppRouter();
const validate = createValidator();
const controller = new PropertyController();

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
    controller.create
);

// Get property by ID
router.get(
    "/:id",
    validate.params(propertyIdParamSchema),
    validate.response(responsePropertySchema),
    controller.getById
);

// Update property by ID
router.patch(
    "/:id",
    validate.params(propertyIdParamSchema),
    validate.body(updatePropertySchema),
    validate.response(responsePropertySchema),
    controller.update
);

export default router;
