import AppRouter from "./AppRouter.ts";
import propertyRouter from "./property.routes.ts";
import roomRouter from "./room.routes.ts";
import bedRouter from "./bed.routes.ts";
import userRouter from "./user.routes.ts";
import authRouter from "./auth.routes.ts";

const router = new AppRouter();

router.use("/auth", authRouter);
router.use("/properties", propertyRouter);
router.use("/users", userRouter);
router.use("/properties", roomRouter);
router.use("/properties", bedRouter);

export default router;

