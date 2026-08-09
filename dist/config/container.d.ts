import { PropertyController } from "../controllers/property.controller.ts";
import { RoomController } from "../controllers/room.controller.ts";
import { BedController } from "../controllers/bed.controller.ts";
import { UserController } from "../controllers/user.controller.ts";
import { AuthController } from "../controllers/auth.controller.ts";
import { PropertyPricingController } from "../controllers/propertyPricing.controller.ts";
import { PropertySetupController } from "../controllers/propertySetup.controller.ts";
import { GuestRegistrationController } from "../controllers/guestRegistration.controller.ts";
import { TenancyRegistrationController } from "../controllers/tenancyRegistration.controller.ts";
import { VacateTenancyController } from "../controllers/vacateTenancy.controller.ts";
import { RoomSetupController } from "../controllers/roomSetup.controller.ts";
import { BedSetupController } from "../controllers/bedSetup.controller.ts";
import { OwnerController } from "../controllers/owner.controller.ts";
import { ProfileController } from "../controllers/profile.controller.ts";
export interface Container {
    propertyController: PropertyController;
    roomController: RoomController;
    bedController: BedController;
    userController: UserController;
    authController: AuthController;
    propertyPricingController: PropertyPricingController;
    propertySetupController: PropertySetupController;
    guestRegistrationController: GuestRegistrationController;
    tenancyRegistrationController: TenancyRegistrationController;
    vacateTenancyController: VacateTenancyController;
    roomSetupController: RoomSetupController;
    bedSetupController: BedSetupController;
    ownerController: OwnerController;
    profileController: ProfileController;
}
export declare function buildContainer(): Container;
//# sourceMappingURL=container.d.ts.map