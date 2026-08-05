// repositoryProvider.ts

import type { BedRepository } from "../../repository/bed.repository.ts";
import type { GuestRepository } from "../../repository/guest.repository.ts";
import type { PropertyRepository } from "../../repository/property.repository.ts";
import type { PropertyPricingRepository } from "../../repository/propertyPricing.repository.ts";
import type { RoomRepository } from "../../repository/room.repository.ts";
import type { TenancyRepository } from "../../repository/tenancy.repository.ts";


export interface RepositoryProvider {
    propertyRepository: PropertyRepository;
    propertyPricingRepository: PropertyPricingRepository;
    roomRepository: RoomRepository;
    bedRepository: BedRepository;
    guestRepository: GuestRepository;
    tenancyRepository: TenancyRepository;
}