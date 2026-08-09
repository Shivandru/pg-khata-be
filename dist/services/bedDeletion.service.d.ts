import type { UnitOfWork } from "../application/unitOfWork/unitOfWork.ts";
export declare class BedDeletionService {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    delete(bedId: string, propertyId: string, roomId: string): Promise<{
        deletedBedId: string;
        remainingBeds: {
            bedId: string;
            roomId: string;
            propertyId: string;
            label: string;
            isOccupied: boolean;
        }[];
    }>;
}
//# sourceMappingURL=bedDeletion.service.d.ts.map