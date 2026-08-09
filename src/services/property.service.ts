import { PropertyRepository } from "../repository/property.repository.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import type { UpdateProperty } from "../schemas/property.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";

type CreateProperty = {
    name: string;
    address: string;
    userId: string;
};

export class PropertyService {

    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly ownerRepository: OwnerRepository
    ) {}

    async create({ name, address, userId }: CreateProperty) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${userId} not found`);
        }
        const ownerId = owner.ownerId;
        const property = await this.propertyRepository.create({ name, address, ownerId });
        RequestLogger.info(`Property created: ${property.name} (${property.propertyId})`);
        return property;
    }

    async getById(propertyId: string) {
        const property = await this.propertyRepository.findById(propertyId);
        if (!property) {
            throw new NotFoundException(`Property with ID ${propertyId} not found`);
        }
        return property;
    }

    async update(propertyId: string, updateData: UpdateProperty) {
        // Ensure property exists first (will throw NotFoundException if it doesn't)
        await this.getById(propertyId);

        const updatedProperty = await this.propertyRepository.update(propertyId, updateData);
        if (!updatedProperty) {
            throw new NotFoundException(`Property with ID ${propertyId} not found for update`);
        }
        RequestLogger.info(`Property updated: ${propertyId}`);
        return updatedProperty;
    }

    async getAll() {
        return await this.propertyRepository.findAll();
    }

    async getByOwnerId(userId: string) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${userId} not found`);
        }
        const ownerId = owner.ownerId;
        return await this.propertyRepository.findByOwnerId(ownerId);
    }
}
