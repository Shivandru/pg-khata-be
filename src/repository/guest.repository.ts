import type { Collection, Db, ClientSession } from "mongodb";
import type { CreateGuest, Guest, UpdateGuest } from "../schemas/guest.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export class GuestRepository {
  constructor(private readonly db: Db, private readonly session?: ClientSession) {}

  private get collection(): Collection<Guest> {
    return this.db.collection<Guest>("guests");
  }

  async create(guestData: CreateGuest & { userId: string }): Promise<Guest> {
    const guestId = generateId(ID_PREFIXES.guest);

    const newGuest: Guest = {
      guestId,
      ...guestData,
    };

    await this.collection.insertOne(newGuest, { session: this.session });

    return newGuest;
  }

  async getGuestById(guestId: string): Promise<Guest | null> {
    return await this.collection.findOne({ guestId }, { session: this.session });
  }

  async getGuestByUserId(userId: string): Promise<Guest | null> {
    return await this.collection.findOne({ userId }, { session: this.session });
  }

  async updateGuest(
    guestId: string,
    updateData: UpdateGuest,
  ): Promise<Guest | null> {
    await this.collection.updateOne({ guestId }, { $set: updateData }, { session: this.session });

    return await this.getGuestById(guestId);
  }

  async deleteGuest(guestId: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ guestId }, { session: this.session });

    return result.deletedCount > 0;
  }

  async getGuestsByIds(guestIds: string[]): Promise<Guest[]> {
    return await this.collection.find({ guestId: { $in: guestIds } }, { session: this.session }).toArray();
  }
}
