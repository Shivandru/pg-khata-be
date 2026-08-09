import { RoomRepository } from "../repository/room.repository.ts";
import { BedRepository } from "../repository/bed.repository.ts";
import { PropertyService } from "./property.service.ts";
import type { UpdateRoom } from "../schemas/room.ts";
type CreateRoom = {
    propertyId: string;
    roomNumber: string;
    floor: number;
    bedCount: number;
    occupiedCount: number;
};
export type RoomById = {
    roomId: string;
    propertyId: string;
};
export type UpdateRoomById = {
    roomId: string;
    propertyId: string;
    updateData: UpdateRoom;
};
export declare class RoomService {
    private readonly roomRepository;
    private readonly bedRepository;
    private readonly propertyService;
    constructor(roomRepository: RoomRepository, bedRepository: BedRepository, propertyService: PropertyService);
    create({ propertyId, roomNumber, floor, bedCount, occupiedCount }: CreateRoom): Promise<{
        roomId: string;
        propertyId: string;
        roomNumber: string;
        floor: number;
        bedCount: number;
        occupiedCount: number;
    }>;
    getById({ propertyId, roomId }: RoomById): Promise<{
        roomId: string;
        propertyId: string;
        roomNumber: string;
        floor: number;
        bedCount: number;
        occupiedCount: number;
    }>;
    getRoomsByProperty(propertyId: string): Promise<{
        roomId: string;
        propertyId: string;
        roomNumber: string;
        floor: number;
        bedCount: number;
        occupiedCount: number;
    }[]>;
    update({ roomId, propertyId, updateData }: UpdateRoomById): Promise<{
        roomId: string;
        propertyId: string;
        roomNumber: string;
        floor: number;
        bedCount: number;
        occupiedCount: number;
    }>;
    delete({ roomId, propertyId }: RoomById): Promise<{
        success: boolean;
    }>;
}
export {};
//# sourceMappingURL=room.service.d.ts.map