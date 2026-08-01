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

export interface Container {
    propertyController: PropertyController;
    roomController: RoomController;
    bedController: BedController;
    userController: UserController;
    authController: AuthController;
    propertyPricingController: PropertyPricingController
}

export function buildContainer(): Container {
    const db = MongoConnection.getInstance().getDb();

    // Repositories
    const propertyRepository = new PropertyRepository(db);
    const roomRepository = new RoomRepository(db);
    const bedRepository = new BedRepository(db);
    const userRepository = new UserRepository(db);
    const propertyPricingRepository = new PropertyPricingRepository(db);


    // Services
    const propertyService = new PropertyService(propertyRepository);

    const roomService = new RoomService(
        roomRepository,
        bedRepository,
        propertyService
    );

    const bedService = new BedService(
        bedRepository,
        roomService
    );

    const propertyPricingService = new PropertyPricingService(propertyPricingRepository);

    const userServices = new UserServices(userRepository);

    const authService = new AuthService(userRepository);

    // Controllers
    const propertyController = new PropertyController(propertyService);

    const roomController = new RoomController(roomService);

    const bedController = new BedController(bedService);

    const userController = new UserController(userServices);

    const authController = new AuthController(authService);

    const propertyPricingController = new PropertyPricingController(propertyPricingService);

    return {
        propertyController,
        roomController,
        bedController,
        userController,
        authController,
        propertyPricingController
    };
}