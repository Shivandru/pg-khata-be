import type { Collection, Db } from "mongodb";
import type { z } from "zod";
import { bedSchema, type UpdateBed } from "../schemas/bed.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import type { RoomById } from "../services/room.service.ts";

export type Bed = z.infer<typeof bedSchema>;

export class BedRepository {

    constructor(
        private readonly db: Db
    ) { }
    private get collection(): Collection<Bed> {
        return this.db.collection<Bed>("beds");
    }


    async create(bedData: Omit<Bed, "bedId">): Promise<Bed> {
        const bedId = generateId(ID_PREFIXES.bed);
        const newBed: Bed = {
            bedId,
            ...bedData,
        };
        await this.collection.insertOne(newBed);
        return newBed;
    }

    async findById(bedId: string, propertyId: string, roomId: string): Promise<Bed | null> {
        return await this.collection.findOne({ propertyId, roomId, bedId });
    }

    async findByRoomId(roomId: string, propertyId: string): Promise<Bed[]> {
        return await this.collection.find({ propertyId, roomId }).toArray();
    }

    async countByRoomId({ roomId, propertyId }: RoomById): Promise<number> {
        return await this.collection.countDocuments({ propertyId, roomId });
    }

    async update({bedId, roomId, propertyId, updateData}: {bedId: string, roomId: string, propertyId: string, updateData: UpdateBed}): Promise<Bed | null> {
        await this.collection.updateOne({ propertyId, roomId, bedId }, { $set: updateData });
        return await this.findById(bedId, propertyId, roomId);
    }

    async delete(bedId: string, propertyId: string, roomId: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ propertyId, roomId, bedId,  });
        return result.deletedCount > 0;
    }
}
