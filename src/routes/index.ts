import AppRouter from "./AppRouter.ts";
import propertyRouter from "./property.routes.ts";
import roomRouter from "./room.routes.ts";
import bedRouter from "./bed.routes.ts";

const router = new AppRouter();

router.use("/properties", propertyRouter);
router.use("/", roomRouter);
router.use("/", bedRouter);

export default router;

