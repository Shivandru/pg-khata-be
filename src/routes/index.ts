import AppRouter from "./AppRouter.ts";
import type { Container } from "../config/container.ts";
import createAuthRouter from "./auth.routes.ts";
import createPropertyRouter from "./property.routes.ts";
import createUserRouter from "./user.routes.ts";
import createRoomRouter from "./room.routes.ts";
import createBedRouter from "./bed.routes.ts";
import createPropertyPricingRouter from "./propertyPricing.routes.ts";
import createPropertySetupRouter from "./propertySetup.routes.ts";
import createGuestRouter from "./guest.routes.ts";
import createTenancyRegistrationRouter from "./tenancy.routes.ts";
import createRoomSetupRouter from "./roomSetup.routes.ts";
import createBedSetupRouter from "./bedSetup.routes.ts";
import createOwnerRouter from "./owner.routes.ts";
import createProfileRouter from "./profile.routes.ts";

// export default router;
export default function createApiRouter(container: Container) {
  const router = new AppRouter();

  router.use("/auth", createAuthRouter(container.authController));
  router.use("/properties", createPropertyRouter(container.propertyController));
  router.use("/users", createUserRouter(container.userController));
  router.use("/properties", createRoomRouter(container.roomController));
  router.use("/properties", createBedRouter(container.bedController));
  router.use(
    "/property-pricings",
    createPropertyPricingRouter(container.propertyPricingController),
  );
  router.use(
    "/build",
    createPropertySetupRouter(container.propertySetupController),
  );
  router.use(
    "/guests",
    createGuestRouter(container.guestRegistrationController),
  );
  router.use(
    "/tenancies",
    createTenancyRegistrationRouter(
      container.tenancyRegistrationController,
      container.vacateTenancyController,
    ),
  );

  router.use("/room-setup", createRoomSetupRouter(container.roomSetupController));

  router.use("/bed-setup", createBedSetupRouter(container.bedSetupController));

  router.use("/owner", createOwnerRouter(container.ownerController));

  router.use("/profile", createProfileRouter(container.profileController));

  return router;
}
