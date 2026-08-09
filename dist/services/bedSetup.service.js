import { NotFoundException } from "../utils/exceptions/client.js";
export class BedSetupService {
    unitOfWork;
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    async create({ propertyId, roomId }) {
        return this.unitOfWork.execute(async (repositories) => {
            const { roomRepository, bedRepository } = repositories;
            const room = await roomRepository.findById({ roomId, propertyId });
            if (!room) {
                throw new NotFoundException("Room not found");
            }
            const bed = await bedRepository.create({ propertyId, roomId });
            await roomRepository.updateBedCount(propertyId, roomId, room.bedCount + 1);
            return bed;
        });
    }
}
//# sourceMappingURL=bedSetup.service.js.map