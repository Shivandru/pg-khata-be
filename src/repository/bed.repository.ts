import type { Collection } from "mongodb";
import MongoConnection from "../config/db.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { bedSchema, type UpdateBed } from "../schemas/bed.ts";
import type { z } from "zod";

export type Bed = z.infer<typeof bedSchema>;

export class BedRepository {
    private getCollection(): Collection<Bed> {
        return MongoConnection.getInstance().getDb().collection<Bed>("beds");
    }

    async create(bedData: Omit<Bed, "bedId">): Promise<Bed> {
        const bedId = generateId(ID_PREFIXES.bed);
        const newBed: Bed = {
            bedId,
            ...bedData,
        };
        await this.getCollection().insertOne(newBed);
        return newBed;
    }

    async findById(bedId: string, propertyId: string, roomId: string): Promise<Bed | null> {
        return await this.getCollection().findOne({ bedId, propertyId, roomId });
    }

    async findByRoomId(roomId: string, propertyId: string): Promise<Bed[]> {
        return await this.getCollection().find({ roomId, propertyId }).toArray();
    }

    async countByRoomId(roomId: string, propertyId: string): Promise<number> {
        return await this.getCollection().countDocuments({ roomId, propertyId });
    }

    async update({bedId, roomId, propertyId, updateData}: {bedId: string, roomId: string, propertyId: string, updateData: UpdateBed}): Promise<Bed | null> {
        await this.getCollection().updateOne({ bedId, roomId, propertyId }, { $set: updateData });
        return await this.findById(bedId, propertyId, roomId);
    }

    async delete(bedId: string, propertyId: string, roomId: string): Promise<boolean> {
        const result = await this.getCollection().deleteOne({ bedId, roomId, propertyId });
        return result.deletedCount > 0;
    }
}
