import AppRouter from "./AppRouter.ts";
import propertyRouter from "./property.routes.ts";
import roomRouter from "./room.routes.ts";
import bedRouter from "./bed.routes.ts";
import userRouter from "./user.routes.ts";

const router = new AppRouter();

router.use("/properties", propertyRouter);
router.use("/users", userRouter);
router.use("/properties", roomRouter);
router.use("/properties", bedRouter);

export default router;

