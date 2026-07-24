import type { Collection } from "mongodb";
import MongoConnection from "../config/db.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { roomSchema } from "../schemas/room.ts";
import type { z } from "zod";

export type Room = z.infer<typeof roomSchema>;

export class RoomRepository {
    private getCollection(): Collection<Room> {
        return MongoConnection.getInstance().getDb().collection<Room>("rooms");
    }

    async create(roomData: Omit<Room, "roomId">): Promise<Room> {
        const roomId = generateId(ID_PREFIXES.room);
        const newRoom: Room = {
            roomId,
            ...roomData,
        };
        await this.getCollection().insertOne(newRoom);
        return newRoom;
    }

    async findById(roomId: string): Promise<Room | null> {
        return await this.getCollection().findOne({ roomId });
    }

    async findByPropertyId(propertyId: string): Promise<Room[]> {
        return await this.getCollection().find({ propertyId }).toArray();
    }

    async update(roomId: string, updateData: Partial<Omit<Room, "roomId" | "propertyId">>): Promise<Room | null> {
        await this.getCollection().updateOne({ roomId }, { $set: updateData });
        return await this.findById(roomId);
    }

    async delete(roomId: string): Promise<boolean> {
        const result = await this.getCollection().deleteOne({ roomId });
        return result.deletedCount > 0;
    }
}
