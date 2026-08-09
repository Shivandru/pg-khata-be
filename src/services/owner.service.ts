import type { CreateOwner, UpdateOwner } from "../schemas/owner.ts";
import type { OwnerRepository } from "../repository/owner.repository.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";

export class OwnerService {
  constructor(
    private readonly ownerRepository: OwnerRepository,
  ) {}

  async create(userId: string, ownerData: CreateOwner) {
    return await this.ownerRepository.create({
      userId,
      ...ownerData,
    });
  }

  async getById(ownerId: string) {
    const owner = await this.ownerRepository.getOwnerById(ownerId);

    if (!owner) {
      throw new NotFoundException(
        `Owner with ID ${ownerId} not found`,
      );
    }

    return owner;
  }

  async getByUserId(userId: string) {
    const owner = await this.ownerRepository.getOwnerByUserId(userId);

    if (!owner) {
      throw new NotFoundException(
        `Owner profile for user ${userId} not found`,
      );
    }

    return owner;
  }

  async update(ownerId: string, updateData: UpdateOwner) {
    const owner = await this.ownerRepository.updateOwner(
      ownerId,
      updateData,
    );

    if (!owner) {
      throw new NotFoundException(
        `Owner with ID ${ownerId} not found`,
      );
    }

    return owner;
  }

  async delete(ownerId: string) {
    const deleted = await this.ownerRepository.deleteOwner(ownerId);

    if (!deleted) {
      throw new NotFoundException(
        `Owner with ID ${ownerId} not found`,
      );
    }

    return deleted;
  }
}