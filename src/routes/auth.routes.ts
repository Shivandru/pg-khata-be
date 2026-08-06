import { AuthController } from "../controllers/auth.controller.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { createValidator } from "../middlewares/validator.ts";
import { authResponseSchema, googleAuthSchema } from "../schemas/user.ts";
import AppRouter from "./AppRouter.ts";

export default function createAuthRouter(
    authController: AuthController
){
const router = new AppRouter();
const validate = createValidator();

router.use("/", RequestLogger.getMiddleware("Auth"));

router.post(
    "/signup",
    validate.body(googleAuthSchema),
    validate.response(authResponseSchema),
    authController.signup
);

return router;
}