import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { createUserSchema, authResponseSchema } from "../schemas/user.ts";
import { AuthController } from "../controllers/auth.controller.ts";

export default function createAuthRouter(
    authController: AuthController
){
const router = new AppRouter();
const validate = createValidator();

router.use("/", RequestLogger.getMiddleware("Auth"));

router.post(
    "/signup",
    validate.body(createUserSchema),
    validate.response(authResponseSchema),
    authController.signup
);

return router;
}