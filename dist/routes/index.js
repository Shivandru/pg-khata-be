import AppRouter from "./AppRouter.js";
import createAuthRouter from "./auth.routes.js";
import createPropertyRouter from "./property.routes.js";
import createUserRouter from "./user.routes.js";
import createRoomRouter from "./room.routes.js";
import createBedRouter from "./bed.routes.js";
import createPropertyPricingRouter from "./propertyPricing.routes.js";
import createPropertySetupRouter from "./propertySetup.routes.js";
import createGuestRouter from "./guest.routes.js";
import createTenancyRegistrationRouter from "./tenancy.routes.js";
import createRoomSetupRouter from "./roomSetup.routes.js";
import createBedSetupRouter from "./bedSetup.routes.js";
import createOwnerRouter from "./owner.routes.js";
import createProfileRouter from "./profile.routes.js";
// export default router;
export default function createApiRouter(container) {
    const router = new AppRouter();
    router.use("/auth", createAuthRouter(container.authController));
    router.use("/properties", createPropertyRouter(container.propertyController));
    router.use("/users", createUserRouter(container.userController));
    router.use("/properties", createRoomRouter(container.roomController));
    router.use("/properties", createBedRouter(container.bedController));
    router.use("/property-pricings", createPropertyPricingRouter(container.propertyPricingController));
    router.use("/build", createPropertySetupRouter(container.propertySetupController));
    router.use("/guests", createGuestRouter(container.guestRegistrationController));
    router.use("/tenancies", createTenancyRegistrationRouter(container.tenancyRegistrationController, container.vacateTenancyController));
    router.use("/room-setup", createRoomSetupRouter(container.roomSetupController));
    router.use("/bed-setup", createBedSetupRouter(container.bedSetupController));
    router.use("/owner", createOwnerRouter(container.ownerController));
    router.use("/profile", createProfileRouter(container.profileController));
    return router;
}
//# sourceMappingURL=index.js.map