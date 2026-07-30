import type { Collection, Db } from "mongodb";
import type { z } from "zod";
import { roomSchema } from "../schemas/room.ts";
import type { RoomById, UpdateRoomById } from "../services/room.service.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

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

    async findById({roomId, propertyId}: RoomById): Promise<Room | null> {
        return await this.collection.findOne({ propertyId, roomId });
    }

    async findByPropertyId(propertyId: string): Promise<Room[]> {
        return await this.collection.find({ propertyId }).toArray();
    }

    async update({ roomId, propertyId, updateData }: UpdateRoomById): Promise<Room | null> {
        await this.collection.updateOne({ propertyId, roomId }, { $set: updateData });
        return await this.findById({roomId, propertyId});
    }

    async delete({ roomId, propertyId }: RoomById): Promise<boolean> {
        const result = await this.collection.deleteOne({ propertyId, roomId });
        return result.deletedCount > 0;
    }
}
