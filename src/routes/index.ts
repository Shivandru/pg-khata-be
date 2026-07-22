import AppRouter from "./AppRouter.ts";
import propertyRouter from "./property.routes.ts";

const router = new AppRouter();

router.use("/properties", propertyRouter);

export default router;
