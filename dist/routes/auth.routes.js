import { AuthController } from "../controllers/auth.controller.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { createValidator } from "../middlewares/validator.js";
import { authResponseSchema, googleAuthSchema } from "../schemas/user.js";
import AppRouter from "./AppRouter.js";
export default function createAuthRouter(authController) {
    const router = new AppRouter();
    const validate = createValidator();
    router.use("/", RequestLogger.getMiddleware("Auth"));
    router.post("/signup", validate.body(googleAuthSchema), validate.response(authResponseSchema), authController.signup);
    return router;
}
//# sourceMappingURL=auth.routes.js.map