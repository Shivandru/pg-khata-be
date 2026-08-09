import type { ProfileController } from "../controllers/profile.controller.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { createValidator } from "../middlewares/validator.ts";
import { profileResponseSchema } from "../schemas/profile.ts";
import AppRouter from "./AppRouter.ts";

export default function createProfileRouter(profileController: ProfileController){
    const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Profile"));
  router.use("/", authMiddleware);

  router.get(
    "/me",
    validate.response(profileResponseSchema),
    profileController.getMe,
  );

  return router;
}