import type { Collection, Db } from "mongodb";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { roomSchema, type UpdateRoom } from "../schemas/room.ts";
import type { z } from "zod";

export type Room = z.infer<typeof roomSchema>;

export class RoomRepository {

    constructor( private readonly db: Db ) {}
    private get collection(): Collection<Room> {
        return this.db.collection<Room>("rooms");
    }

    async create(roomData: Omit<Room, "roomId">): Promise<Room> {
        const roomId = generateId(ID_PREFIXES.room);
        const newRoom: Room = {
            roomId,
            ...roomData,
        };
        await this.collection.insertOne(newRoom);
        return newRoom;
    }

    async findById(roomId: string, propertyId: string): Promise<Room | null> {
        return await this.collection.findOne({ roomId, propertyId });
    }

    async findByPropertyId(propertyId: string): Promise<Room[]> {
        return await this.collection.find({ propertyId }).toArray();
    }

    async update(roomId: string, propertyId: string, updateData: UpdateRoom): Promise<Room | null> {
        await this.collection.updateOne({ propertyId, roomId }, { $set: updateData });
        return await this.findById(roomId, propertyId);
    }

    async delete(roomId: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ roomId });
        return result.deletedCount > 0;
    }
}
