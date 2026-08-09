import MongoConnection from "./db.ts";

import { PropertyRepository } from "../repository/property.repository.ts";
import { RoomRepository } from "../repository/room.repository.ts";
import { BedRepository } from "../repository/bed.repository.ts";
import { UserRepository } from "../repository/user.repository.ts";
import { PropertyPricingRepository } from "../repository/propertyPricing.repository.ts";

import { PropertyService } from "../services/property.service.ts";
import { RoomService } from "../services/room.service.ts";
import { BedService } from "../services/bed.service.ts";
import { UserServices } from "../services/user.service.ts";
import { AuthService } from "../services/auth.service.ts";
import { PropertyPricingService } from "../services/propertyPricing.service.ts";

import { PropertyController } from "../controllers/property.controller.ts";
import { RoomController } from "../controllers/room.controller.ts";
import { BedController } from "../controllers/bed.controller.ts";
import { UserController } from "../controllers/user.controller.ts";
import { AuthController } from "../controllers/auth.controller.ts";
import { PropertyPricingController } from "../controllers/propertyPricing.controller.ts";
import { MongoUnitOfWork } from "../application/unitOfWork/mongoUnitOfWork.ts";
import { PropertySetupService } from "../services/propertySetup.service.ts";
import { PropertySetupController } from "../controllers/propertySetup.controller.ts";
import { GuestRepository } from "../repository/guest.repository.ts";
import { GuestRegistrationController } from "../controllers/guestRegistration.controller.ts";
import { GuestRegistrationService } from "../services/guestRegistration.service.ts";
import { TenancyRegistrationController } from "../controllers/tenancyRegistration.controller.ts";
import { TenancyRegistrationService } from "../services/tenancyRegistration.service.ts";
import { VacateTenancyController } from "../controllers/vacateTenancy.controller.ts";
import { VacateTenancyService } from "../services/vacateTenancyService.ts";
import { GoogleAuthService } from "../services/googleAuth.service.ts";
import { RoomSetupService } from "../services/roomSetup.service.ts";
import { RoomSetupController } from "../controllers/roomSetup.controller.ts";
import { BedSetupController } from "../controllers/bedSetup.controller.ts";
import { BedSetupService } from "../services/bedSetup.service.ts";
import { OwnerController } from "../controllers/owner.controller.ts";
import { OwnerRepository } from "../repository/owner.repository.ts";
import { OwnerService } from "../services/owner.service.ts";
import { ProfileController } from "../controllers/profile.controller.ts";
import { ProfileService } from "../services/profile.service.ts";

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

export function buildContainer(): Container {
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

  const roomService = new RoomService(
    roomRepository,
    bedRepository,
    propertyService,
  );

  const bedService = new BedService(bedRepository, roomService);

  const propertyPricingService = new PropertyPricingService(
    propertyPricingRepository,
  );

  const userServices = new UserServices(userRepository);
  const googleAuthService = new GoogleAuthService();

  const authService = new AuthService(userRepository, googleAuthService);

  const propertySetupService = new PropertySetupService(unitOfWork, ownerRepository);

  const guestRegistrationService = new GuestRegistrationService(
    guestRepository,
    userRepository,
  );

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

  const propertyPricingController = new PropertyPricingController(
    propertyPricingService,
  );

  const propertySetupController = new PropertySetupController(
    propertySetupService,
  );

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
