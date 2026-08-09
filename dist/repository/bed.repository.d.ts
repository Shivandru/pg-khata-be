import type { ClientSession, Db } from "mongodb";
import type { z } from "zod";
import { bedSchema, type UpdateBed } from "../schemas/bed.ts";
import type { RoomById } from "../services/room.service.ts";
export type Bed = z.infer<typeof bedSchema>;
export declare class BedRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create({ propertyId, roomId }: RoomById): Promise<Bed>;
    createMany(beds: Omit<Bed, "bedId">[]): Promise<Bed[]>;
    findById(bedId: string, propertyId: string, roomId: string): Promise<Bed | null>;
    findByRoomId(roomId: string, propertyId: string): Promise<Bed[]>;
    countByRoomId({ roomId, propertyId }: RoomById): Promise<number>;
    update({ bedId, roomId, propertyId, updateData, }: {
        bedId: string;
        roomId: string;
        propertyId: string;
        updateData: UpdateBed;
    }): Promise<Bed | null>;
    updateLabels(propertyId: string, roomId: string, beds: Bed[]): Promise<void>;
    delete(bedId: string, propertyId: string, roomId: string): Promise<boolean>;
    deleteMany(propertyId: string, roomId: string): Promise<number>;
    setOccupied(bedId: string, propertyId: string, roomId: string, isOccupied: boolean): Promise<void>;
}
//# sourceMappingURL=bed.repository.d.ts.map