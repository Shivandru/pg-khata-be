import type { OwnerController } from "../controllers/owner.controller.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { createValidator } from "../middlewares/validator.ts";
import { createOwnerSchema, ownerSchema } from "../schemas/owner.ts";
import AppRouter from "./AppRouter.ts";

export default function createOwnerRouter(ownerController: OwnerController){
    const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Owner"));
  router.use("/", authMiddleware);

  router.post(
    "/",
    validate.body(createOwnerSchema),
    validate.response(ownerSchema),
    ownerController.create,
  );

  return router;
}