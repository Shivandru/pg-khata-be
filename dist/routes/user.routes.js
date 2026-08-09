import AppRouter from "./AppRouter.js";
import { createValidator } from "../middlewares/validator.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import { createUserSchema, updateUserSchema, userSchema, authResponseSchema } from "../schemas/user.js";
import { z } from "zod";
import { id, ID_PREFIXES } from "../utils/common.js";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
export default function createUserRouter(userController) {
    const router = new AppRouter();
    const validate = createValidator();
    const userIdParamSchema = z.object({
        id: id(ID_PREFIXES.user),
    });
    // Apply RequestLogger and auth middleware to all property routes
    router.use("/", RequestLogger.getMiddleware("User"));
    router.post("/", validate.body(createUserSchema), validate.response(userSchema), userController.create);
    router.get("/:id", validate.params(userIdParamSchema), validate.response(userSchema), userController.getUser);
    router.use("/", authMiddleware);
    router.patch("/:id", validate.params(userIdParamSchema), validate.body(updateUserSchema), validate.response(authResponseSchema), userController.update);
    router.delete("/:id", validate.params(userIdParamSchema), userController.delete);
    return router;
}
//# sourceMappingURL=user.routes.js.map