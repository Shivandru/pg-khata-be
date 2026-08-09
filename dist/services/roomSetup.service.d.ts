import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { CreateRoom } from "../schemas/room.ts";
export declare class RoomSetupService {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    setup(propertyId: string, request: CreateRoom): Promise<{
        room: {
            roomId: string;
            propertyId: string;
            roomNumber: string;
            floor: number;
            bedCount: number;
            occupiedCount: number;
        };
        beds: {
            bedId: string;
            roomId: string;
            propertyId: string;
            label: string;
            isOccupied: boolean;
        }[];
    }>;
}
//# sourceMappingURL=roomSetup.service.d.ts.map