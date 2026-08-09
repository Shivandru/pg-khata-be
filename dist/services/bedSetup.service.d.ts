import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
import type { RoomById } from "./room.service.ts";
export declare class BedSetupService {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    create({ propertyId, roomId }: RoomById): Promise<{
        bedId: string;
        roomId: string;
        propertyId: string;
        label: string;
        isOccupied: boolean;
    }>;
}
//# sourceMappingURL=bedSetup.service.d.ts.map