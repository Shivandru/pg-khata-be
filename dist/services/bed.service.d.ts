import { BedRepository } from "../repository/bed.repository.ts";
import type { UpdateBed } from "../schemas/bed.ts";
import { RoomService } from "./room.service.ts";
export declare class BedService {
    private readonly bedRepository;
    private readonly roomService;
    constructor(bedRepository: BedRepository, roomService: RoomService);
    create(roomId: string, propertyId: string): Promise<{
        bedId: string;
        roomId: string;
        propertyId: string;
        label: string;
        isOccupied: boolean;
    }>;
    getById(bedId: string, propertyId: string, roomId: string): Promise<{
        bedId: string;
        roomId: string;
        propertyId: string;
        label: string;
        isOccupied: boolean;
    }>;
    getBedsByRoom(roomId: string, propertyId: string): Promise<{
        bedId: string;
        roomId: string;
        propertyId: string;
        label: string;
        isOccupied: boolean;
    }[]>;
    update({ bedId, propertyId, roomId, updateData }: {
        bedId: string;
        propertyId: string;
        roomId: string;
        updateData: UpdateBed;
    }): Promise<{
        bedId: string;
        roomId: string;
        propertyId: string;
        label: string;
        isOccupied: boolean;
    }>;
    delete(bedId: string, propertyId: string, roomId: string): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=bed.service.d.ts.map