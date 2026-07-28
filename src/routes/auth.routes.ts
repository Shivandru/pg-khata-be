import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { createUserSchema, authResponseSchema } from "../schemas/user.ts";
import { AuthController } from "../controllers/auth.controller.ts";

const router = new AppRouter();
const validate = createValidator();
const controller = new AuthController();

router.use("/", RequestLogger.getMiddleware("Auth"));

router.post(
    "/signup",
    validate.body(createUserSchema),
    validate.response(authResponseSchema),
    controller.signup
);

export default router;