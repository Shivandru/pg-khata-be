import type { Db, ClientSession } from "mongodb";
import type { z } from "zod";
import { roomSchema } from "../schemas/room.ts";
import type { RoomById, UpdateRoomById } from "../services/room.service.ts";
export type Room = z.infer<typeof roomSchema>;
export declare class RoomRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    private get collection();
    create(roomData: Omit<Room, "roomId">): Promise<Room>;
    findById({ roomId, propertyId }: RoomById): Promise<Room | null>;
    findByPropertyId(propertyId: string): Promise<Room[]>;
    update({ roomId, propertyId, updateData, }: UpdateRoomById): Promise<Room | null>;
    delete({ roomId, propertyId }: RoomById): Promise<boolean>;
    incrementOccupiedCount(propertyId: string, roomId: string, delta: number): Promise<void>;
    updateBedCount(propertyId: string, roomId: string, bedCount: number): Promise<void>;
}
//# sourceMappingURL=room.repository.d.ts.map