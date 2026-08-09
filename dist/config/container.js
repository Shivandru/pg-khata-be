import MongoConnection from "./db.js";
import { PropertyRepository } from "../repository/property.repository.js";
import { RoomRepository } from "../repository/room.repository.js";
import { BedRepository } from "../repository/bed.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { PropertyPricingRepository } from "../repository/propertyPricing.repository.js";
import { PropertyService } from "../services/property.service.js";
import { RoomService } from "../services/room.service.js";
import { BedService } from "../services/bed.service.js";
import { UserServices } from "../services/user.service.js";
import { AuthService } from "../services/auth.service.js";
import { PropertyPricingService } from "../services/propertyPricing.service.js";
import { PropertyController } from "../controllers/property.controller.js";
import { RoomController } from "../controllers/room.controller.js";
import { BedController } from "../controllers/bed.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { AuthController } from "../controllers/auth.controller.js";
import { PropertyPricingController } from "../controllers/propertyPricing.controller.js";
import { MongoUnitOfWork } from "../application/unitOfWork/mongoUnitOfWork.js";
import { PropertySetupService } from "../services/propertySetup.service.js";
import { PropertySetupController } from "../controllers/propertySetup.controller.js";
import { GuestRepository } from "../repository/guest.repository.js";
import { GuestRegistrationController } from "../controllers/guestRegistration.controller.js";
import { GuestRegistrationService } from "../services/guestRegistration.service.js";
import { TenancyRegistrationController } from "../controllers/tenancyRegistration.controller.js";
import { TenancyRegistrationService } from "../services/tenancyRegistration.service.js";
import { VacateTenancyController } from "../controllers/vacateTenancy.controller.js";
import { VacateTenancyService } from "../services/vacateTenancyService.js";
import { GoogleAuthService } from "../services/googleAuth.service.js";
import { RoomSetupService } from "../services/roomSetup.service.js";
import { RoomSetupController } from "../controllers/roomSetup.controller.js";
import { BedSetupController } from "../controllers/bedSetup.controller.js";
import { BedSetupService } from "../services/bedSetup.service.js";
import { OwnerController } from "../controllers/owner.controller.js";
import { OwnerRepository } from "../repository/owner.repository.js";
import { OwnerService } from "../services/owner.service.js";
import { ProfileController } from "../controllers/profile.controller.js";
import { ProfileService } from "../services/profile.service.js";
export function buildContainer() {
    const db = MongoConnection.getInstance().getDb();
    const client = MongoConnection.getInstance().getClient();
    const unitOfWork = new MongoUnitOfWork(client, db);
    // Repositories
    const propertyRepository = new PropertyRepository(db);
    const roomRepository = new RoomRepository(db);
    const bedRepository = new BedRepository(db);
    const userRepository = new UserRepository(db);
    const propertyPricingRepository = new PropertyPricingRepository(db);
    const guestRepository = new GuestRepository(db);
    const ownerRepository = new OwnerRepository(db);
    // Services
    const propertyService = new PropertyService(propertyRepository, ownerRepository);
    const roomService = new RoomService(roomRepository, bedRepository, propertyService);
    const bedService = new BedService(bedRepository, roomService);
    const propertyPricingService = new PropertyPricingService(propertyPricingRepository);
    const userServices = new UserServices(userRepository);
    const googleAuthService = new GoogleAuthService();
    const authService = new AuthService(userRepository, googleAuthService);
    const propertySetupService = new PropertySetupService(unitOfWork, ownerRepository);
    const guestRegistrationService = new GuestRegistrationService(guestRepository, userRepository);
    const tenancyRegistrationService = new TenancyRegistrationService(unitOfWork);
    const vacateTenancyService = new VacateTenancyService(unitOfWork);
    const roomSetupService = new RoomSetupService(unitOfWork);
    const bedSetupService = new BedSetupService(unitOfWork);
    const ownerService = new OwnerService(ownerRepository);
    const profileService = new ProfileService(userRepository, guestRepository, ownerRepository);
    // Controllers
    const propertyController = new PropertyController(propertyService);
    const roomController = new RoomController(roomService);
    const bedController = new BedController(bedService);
    const userController = new UserController(userServices);
    const authController = new AuthController(authService);
    const propertyPricingController = new PropertyPricingController(propertyPricingService);
    const propertySetupController = new PropertySetupController(propertySetupService);
    const guestRegistrationController = new GuestRegistrationController(guestRegistrationService);
    const tenancyRegistrationController = new TenancyRegistrationController(tenancyRegistrationService);
    const vacateTenancyController = new VacateTenancyController(vacateTenancyService);
    const roomSetupController = new RoomSetupController(roomSetupService);
    const bedSetupController = new BedSetupController(bedSetupService);
    const ownerController = new OwnerController(ownerService);
    const profileController = new ProfileController(profileService);
    return {
        propertyController,
        roomController,
        bedController,
        userController,
        authController,
        propertyPricingController,
        propertySetupController,
        guestRegistrationController,
        tenancyRegistrationController,
        vacateTenancyController,
        roomSetupController,
        bedSetupController,
        ownerController,
        profileController
    };
}
//# sourceMappingURL=container.js.map