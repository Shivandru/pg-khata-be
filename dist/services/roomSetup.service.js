import { buildBeds } from "../utils/bed.js";
export class RoomSetupService {
    unitOfWork;
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    async setup(propertyId, request) {
        return this.unitOfWork.execute(async (repositories) => {
            const room = await repositories.roomRepository.create({
                propertyId,
                roomNumber: request.roomNumber,
                floor: request.floor,
                bedCount: request.bedCount,
                occupiedCount: 0,
            });
            const beds = buildBeds(propertyId, room.roomId, request.bedCount);
            const createdBeds = await repositories.bedRepository.createMany(beds);
            return {
                room,
                beds: createdBeds,
            };
        });
    }
}
//# sourceMappingURL=roomSetup.service.js.map