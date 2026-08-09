import type { ClientSession, Collection, Db } from "mongodb";
import type { z } from "zod";
import { bedSchema, type UpdateBed } from "../schemas/bed.ts";
import type { RoomById } from "../services/room.service.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export type Bed = z.infer<typeof bedSchema>;

export class BedRepository {
  constructor(
    private readonly db: Db,
    private readonly session?: ClientSession,
  ) {}
  private get collection(): Collection<Bed> {
    return this.db.collection<Bed>("beds");
  }

  async create({ propertyId, roomId }: RoomById): Promise<Bed> {
    const existingBeds = await this.findByRoomId(roomId, propertyId);

    const bedId = generateId(ID_PREFIXES.bed);

    const newBed: Bed = {
      bedId,
      propertyId,
      roomId,
      label: String.fromCharCode(65 + existingBeds.length), // A, B, C, D...
      isOccupied: false,
    };

    await this.collection.insertOne(newBed, {
      session: this.session,
    });

    return newBed;
  }

  async createMany(beds: Omit<Bed, "bedId">[]): Promise<Bed[]> {
    const newBeds = beds.map((bed) => {
      const bedId = generateId(ID_PREFIXES.bed);
      return {
        bedId,
        ...bed,
      };
    });
    await this.collection.insertMany(newBeds, { session: this.session });
    return newBeds.map((bed) => {
      return {
        bedId: bed.bedId,
        roomId: bed.roomId,
        propertyId: bed.propertyId,
        label: bed.label,
        isOccupied: bed.isOccupied,
      };
    });
  }

  async findById(
    bedId: string,
    propertyId: string,
    roomId: string,
  ): Promise<Bed | null> {
    return await this.collection.findOne(
      { propertyId, roomId, bedId },
      { session: this.session },
    );
  }

  async findByRoomId(roomId: string, propertyId: string): Promise<Bed[]> {
    return await this.collection
      .find({ propertyId, roomId }, { session: this.session })
      .toArray();
  }

  async countByRoomId({ roomId, propertyId }: RoomById): Promise<number> {
    return await this.collection.countDocuments(
      { propertyId, roomId },
      { session: this.session },
    );
  }

  async update({
    bedId,
    roomId,
    propertyId,
    updateData,
  }: {
    bedId: string;
    roomId: string;
    propertyId: string;
    updateData: UpdateBed;
  }): Promise<Bed | null> {
    await this.collection.updateOne(
      { propertyId, roomId, bedId },
      { $set: updateData },
      { session: this.session },
    );
    return await this.findById(bedId, propertyId, roomId);
  }

  async updateLabels(
    propertyId: string,
    roomId: string,
    beds: Bed[],
  ): Promise<void> {
    for (const [index, bed] of beds.entries()) {
      await this.collection.updateOne(
        { propertyId, roomId, bedId: bed.bedId },
        { $set: { label: String.fromCharCode(65 + index) } },
        { session: this.session },
      );
    }
  }

  async delete(
    bedId: string,
    propertyId: string,
    roomId: string,
  ): Promise<boolean> {
    const result = await this.collection.deleteOne(
      { propertyId, roomId, bedId },
      { session: this.session },
    );
    return result.deletedCount > 0;
  }

  async deleteMany(propertyId: string, roomId: string): Promise<number> {
    const result = await this.collection.deleteMany(
      { propertyId, roomId },
      { session: this.session },
    );

    return result.deletedCount;
  }

  async setOccupied(
    bedId: string,
    propertyId: string,
    roomId: string,
    isOccupied: boolean,
  ): Promise<void> {
    await this.collection.updateOne(
      { propertyId, roomId, bedId },
      { $set: { isOccupied } },
      { session: this.session },
    );
  }
}
