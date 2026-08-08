import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import {createUserSchema, updateUserSchema, userSchema, authResponseSchema} from "../schemas/user.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";
import { UserController } from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";

export default function createUserRouter(
    userController: UserController,
) {
    const router = new AppRouter();
const validate = createValidator();

const userIdParamSchema = z.object({
    id: id(ID_PREFIXES.user),
});

// Apply RequestLogger and auth middleware to all property routes
router.use("/", RequestLogger.getMiddleware("User"));

router.post(
    "/",
    validate.body(createUserSchema),
    validate.response(userSchema),
    userController.create
)

router.get(
    "/:id",
    validate.params(userIdParamSchema),
    validate.response(userSchema),
    userController.getUser
)

router.use("/", authMiddleware);
router.patch(
    "/:id",
    validate.params(userIdParamSchema),
    validate.body(updateUserSchema),
    validate.response(authResponseSchema),
    userController.update
)

router.delete(
    "/:id",
    validate.params(userIdParamSchema),
    userController.delete
)

return router;
}