import { NotFoundException } from "../utils/exceptions/client.js";
export class OwnerService {
    ownerRepository;
    constructor(ownerRepository) {
        this.ownerRepository = ownerRepository;
    }
    async create(userId, ownerData) {
        return await this.ownerRepository.create({
            userId,
            ...ownerData,
        });
    }
    async getById(ownerId) {
        const owner = await this.ownerRepository.getOwnerById(ownerId);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${ownerId} not found`);
        }
        return owner;
    }
    async getByUserId(userId) {
        const owner = await this.ownerRepository.getOwnerByUserId(userId);
        if (!owner) {
            throw new NotFoundException(`Owner profile for user ${userId} not found`);
        }
        return owner;
    }
    async update(ownerId, updateData) {
        const owner = await this.ownerRepository.updateOwner(ownerId, updateData);
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${ownerId} not found`);
        }
        return owner;
    }
    async delete(ownerId) {
        const deleted = await this.ownerRepository.deleteOwner(ownerId);
        if (!deleted) {
            throw new NotFoundException(`Owner with ID ${ownerId} not found`);
        }
        return deleted;
    }
}
//# sourceMappingURL=owner.service.js.map