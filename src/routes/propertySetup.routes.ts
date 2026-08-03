import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { propertySetupResponseSchema, propertySetupSchema } from "../schemas/propertySetup.ts";
import type { PropertySetupController } from "../controllers/propertySetup.controller.ts";

export default function createPropertySetupRouter(
  propertySetupController: PropertySetupController,
) {
  const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Property Setup"));
  router.use("/", authMiddleware);

  // Schema for route parameter validation

  // Create property
  router.post(
    "/",
    validate.body(propertySetupSchema),
    validate.response(propertySetupResponseSchema),
    propertySetupController.setup,
  );

  return router;
}