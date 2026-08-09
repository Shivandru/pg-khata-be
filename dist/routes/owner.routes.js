import RequestLogger from "../middlewares/RequestLogger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createValidator } from "../middlewares/validator.js";
import { createOwnerSchema, ownerSchema } from "../schemas/owner.js";
import AppRouter from "./AppRouter.js";
export default function createOwnerRouter(ownerController) {
    const router = new AppRouter();
    const validate = createValidator();
    // Apply RequestLogger and auth middleware to all property routes
    router.use("/", RequestLogger.getMiddleware("Owner"));
    router.use("/", authMiddleware);
    router.post("/", validate.body(createOwnerSchema), validate.response(ownerSchema), ownerController.create);
    return router;
}
//# sourceMappingURL=owner.routes.js.map