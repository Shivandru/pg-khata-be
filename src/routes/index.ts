import AppRouter from "./AppRouter.ts";
import type { Container } from "../config/container.ts";
import createAuthRouter from "./auth.routes.ts";
import createPropertyRouter from "./property.routes.ts";
import createUserRouter from "./user.routes.ts";
import createRoomRouter from "./room.routes.ts";
import createBedRouter from "./bed.routes.ts";
import createPropertyPricingRouter from "./propertyPricing.routes.ts";


// export default router;
export default function createApiRouter(container: Container) {
    const router = new AppRouter();

    router.use("/auth", createAuthRouter(container.authController));
    router.use("/properties", createPropertyRouter(container.propertyController));
    router.use("/users", createUserRouter(container.userController));
    router.use("/properties", createRoomRouter(container.roomController));
    router.use("/properties", createBedRouter(container.bedController));
    router.use("/property-pricings", createPropertyPricingRouter(container.propertyPricingController));

    return router;
}
