import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { propertySetupResponseSchema, propertySetupSchema } from "../schemas/propertySetup.js";
export default function createPropertySetupRouter(propertySetupController) {
    const router = new AppRouter();
    const validate = createValidator();
    // Apply RequestLogger and auth middleware to all property routes
    router.use("/", RequestLogger.getMiddleware("Property Setup"));
    router.use("/", authMiddleware);
    // Schema for route parameter validation
    // Create property
    router.post("/", validate.body(propertySetupSchema), validate.response(propertySetupResponseSchema), propertySetupController.setup);
    return router;
}
//# sourceMappingURL=propertySetup.routes.js.map