import AppRouter from "./AppRouter.ts";
import { createValidator } from "../middlewares/validator.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import {createUserSchema, updateUserSchema, userSchema} from "../schemas/user.ts";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.ts";
import { UserController } from "../controllers/user.controller.ts";

const router = new AppRouter();
const validate = createValidator();
const controller = new UserController();

const userIdParamSchema = z.object({
    id: id(ID_PREFIXES.user),
});

// Apply RequestLogger and auth middleware to all property routes
router.use("/", RequestLogger.getMiddleware("User"));

router.post(
    "/",
    validate.body(createUserSchema),
    validate.response(userSchema),
    controller.create
)

router.get(
    "/:id",
    validate.params(userIdParamSchema),
    validate.response(userSchema),
    controller.getUser
)

router.patch(
    "/:id",
    validate.params(userIdParamSchema),
    validate.body(updateUserSchema),
    validate.response(userSchema),
    controller.update
)

router.delete(
    "/:id",
    validate.params(userIdParamSchema),
    controller.delete
)

export default router;