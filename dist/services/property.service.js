import { PropertyRepository } from "../repository/property.repository.js";
import { NotFoundException } from "../utils/exceptions/client.js";
import RequestLogger from "../middlewares/RequestLogger.js";
export class PropertyService {
    propertyRepository;
    ownerRepository;
    constructor(propertyRepository, ownerRepository) {
        this.propertyRepository = propertyRepository;
        this.ownerRepository = ownerRepository;
    }
    async create({ name, address, userId }) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${userId} not found`);
        }
        const ownerId = owner.ownerId;
        const property = await this.propertyRepository.create({ name, address, ownerId });
        RequestLogger.info(`Property created: ${property.name} (${property.propertyId})`);
        return property;
    }
    async getById(propertyId) {
        const property = await this.propertyRepository.findById(propertyId);
        if (!property) {
            throw new NotFoundException(`Property with ID ${propertyId} not found`);
        }
        return property;
    }
    async update(propertyId, updateData) {
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
    async getByOwnerId(userId) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${userId} not found`);
        }
        const ownerId = owner.ownerId;
        return await this.propertyRepository.findByOwnerId(ownerId);
    }
}
//# sourceMappingURL=property.service.js.map