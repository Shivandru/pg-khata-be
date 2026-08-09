import type { ClientSession, Collection, Db } from "mongodb";
import type { CreateOwner, Owner, UpdateOwner } from "../schemas/owner.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export class OwnerRepository {
  constructor(private readonly db: Db, private readonly session?: ClientSession) {}

  private get collection(): Collection<Owner> {
    return this.db.collection<Owner>("owners");
  }

  async create(ownerData: CreateOwner & { userId: string }): Promise<Owner> {
    const ownerId = generateId(ID_PREFIXES.owner);

    const newOwner: Owner = {
      ownerId,
      ...ownerData,
    };

    await this.collection.insertOne(newOwner, { session: this.session });

    return newOwner;
  }

  async getOwnerById(ownerId: string): Promise<Owner | null> {
    return await this.collection.findOne({ ownerId }, { session: this.session });
  }

  async getOwnerByUserId(userId: string): Promise<Owner | null> {
    return await this.collection.findOne({ userId }, { session: this.session });
  }

  async updateOwner(
    ownerId: string,
    updateData: UpdateOwner,
  ): Promise<Owner | null> {
    await this.collection.updateOne({ ownerId }, { $set: updateData }, { session: this.session });

    return await this.getOwnerById(ownerId);
  }

  async deleteOwner(ownerId: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ ownerId }, { session: this.session });

    return result.deletedCount > 0;
  }

}
