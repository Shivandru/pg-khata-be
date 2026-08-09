import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import type { GuestRegistrationController } from "../controllers/guestRegistration.controller.ts";
import { registerGuestSchema, guestSchema } from "../schemas/guest.ts";

export default function createGuestRouter(guestController: GuestRegistrationController){
    const router = new AppRouter();
  const validate = createValidator();

  // Apply RequestLogger and auth middleware to all property routes
  router.use("/", RequestLogger.getMiddleware("Guest"));
  router.use("/", authMiddleware);

  // router.get(
  //   "/me",
  //   validate.response(guestSchema),
  //   guestController.getMe,
  // );

  router.post(
    "/",
    validate.body(registerGuestSchema),
    validate.response(guestSchema),
    guestController.register,
  );

  return router;
}