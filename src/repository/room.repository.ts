import type { Collection, Db, ClientSession } from "mongodb";
import type { z } from "zod";
import { roomSchema } from "../schemas/room.ts";
import type { RoomById, UpdateRoomById } from "../services/room.service.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export type Room = z.infer<typeof roomSchema>;

export class RoomRepository {
  constructor(
    private readonly db: Db,
    private readonly session?: ClientSession,
  ) {}
  private get collection(): Collection<Room> {
    return this.db.collection<Room>("rooms");
  }

  async create(roomData: Omit<Room, "roomId">): Promise<Room> {
    const roomId = generateId(ID_PREFIXES.room);
    const newRoom: Room = {
      roomId,
      ...roomData,
    };
    await this.collection.insertOne(newRoom, { session: this.session });
    return newRoom;
  }

  async findById({ roomId, propertyId }: RoomById): Promise<Room | null> {
    return await this.collection.findOne(
      { propertyId, roomId },
      { session: this.session },
    );
  }

  async findByPropertyId(propertyId: string): Promise<Room[]> {
    return await this.collection
      .find({ propertyId }, { session: this.session })
      .toArray();
  }

  async update({
    roomId,
    propertyId,
    updateData,
  }: UpdateRoomById): Promise<Room | null> {
    await this.collection.updateOne(
      { propertyId, roomId },
      { $set: updateData },
      { session: this.session },
    );
    return await this.findById({ roomId, propertyId });
  }

  async delete({ roomId, propertyId }: RoomById): Promise<boolean> {
    const result = await this.collection.deleteOne(
      { propertyId, roomId },
      { session: this.session },
    );
    return result.deletedCount > 0;
  }

  async incrementOccupiedCount(
    propertyId: string,
    roomId: string,
    delta: number,
  ): Promise<void> {
    await this.collection.updateOne(
      { propertyId, roomId },
      { $inc: { occupiedCount: delta } },
      { session: this.session },
    );
  }

  async updateBedCount(
    propertyId: string,
    roomId: string,
    bedCount: number,
  ): Promise<void> {
    await this.collection.updateOne(
      { propertyId, roomId },
      { $set: { bedCount } },
      { session: this.session },
    );
  }
}
