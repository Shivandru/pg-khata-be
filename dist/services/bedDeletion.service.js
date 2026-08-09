import { ConflictException, NotFoundException, } from "../utils/exceptions/client.js";
export class BedDeletionService {
    unitOfWork;
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    async delete(bedId, propertyId, roomId) {
        return this.unitOfWork.execute(async (repositories) => {
            const { bedRepository, roomRepository } = repositories;
            const bed = await bedRepository.findById(bedId, propertyId, roomId);
            if (!bed) {
                throw new NotFoundException("Bed not found");
            }
            if (bed.isOccupied) {
                throw new ConflictException("Cannot delete an occupied bed");
            }
            await bedRepository.delete(bedId, propertyId, roomId);
            const remainingBeds = await bedRepository.findByRoomId(roomId, propertyId);
            await bedRepository.updateLabels(propertyId, roomId, remainingBeds);
            await roomRepository.updateBedCount(propertyId, roomId, remainingBeds.length);
            return {
                deletedBedId: bedId,
                remainingBeds,
            };
        });
    }
}
//# sourceMappingURL=bedDeletion.service.js.map