import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { registerGuestSchema, guestSchema } from "../schemas/guest.js";
export default function createGuestRouter(guestController) {
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
    router.post("/", validate.body(registerGuestSchema), validate.response(guestSchema), guestController.register);
    return router;
}
//# sourceMappingURL=guest.routes.js.map