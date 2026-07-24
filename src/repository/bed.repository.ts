import type { Collection } from "mongodb";
import MongoConnection from "../config/db.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { bedSchema } from "../schemas/bed.ts";
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

    async findById(bedId: string): Promise<Bed | null> {
        return await this.getCollection().findOne({ bedId });
    }

    async findByRoomId(roomId: string): Promise<Bed[]> {
        return await this.getCollection().find({ roomId }).toArray();
    }

    async countByRoomId(roomId: string): Promise<number> {
        return await this.getCollection().countDocuments({ roomId });
    }

    async update(bedId: string, updateData: Partial<Omit<Bed, "bedId" | "roomId">>): Promise<Bed | null> {
        await this.getCollection().updateOne({ bedId }, { $set: updateData });
        return await this.findById(bedId);
    }

    async delete(bedId: string): Promise<boolean> {
        const result = await this.getCollection().deleteOne({ bedId });
        return result.deletedCount > 0;
    }
}
