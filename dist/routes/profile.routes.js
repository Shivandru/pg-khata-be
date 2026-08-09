import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createValidator } from "../middlewares/validator.js";
import { profileResponseSchema } from "../schemas/profile.js";
import AppRouter from "./AppRouter.js";
export default function createProfileRouter(profileController) {
    const router = new AppRouter();
    const validate = createValidator();
    // Apply RequestLogger and auth middleware to all property routes
    router.use("/", RequestLogger.getMiddleware("Profile"));
    router.use("/", authMiddleware);
    router.get("/me", validate.response(profileResponseSchema), profileController.getMe);
    return router;
}
//# sourceMappingURL=profile.routes.js.map