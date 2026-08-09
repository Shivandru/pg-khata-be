import RequestLogger from "../middlewares/RequestLogger.js";
import { BedRepository } from "../repository/bed.repository.js";
import { NotFoundException } from "../utils/exceptions/client.js";
import { RoomService } from "./room.service.js";
export class BedService {
    bedRepository;
    roomService;
    constructor(bedRepository, roomService) {
        this.bedRepository = bedRepository;
        this.roomService = roomService;
    }
    async create(roomId, propertyId) {
        // Ensure Room exists
        await this.roomService.getById({ roomId, propertyId });
        const bed = await this.bedRepository.create({ roomId, propertyId });
        RequestLogger.info(`Bed created: Bed ${bed.label} in Room ${bed.roomId} (${bed.bedId})`);
        return bed;
    }
    async getById(bedId, propertyId, roomId) {
        const bed = await this.bedRepository.findById(bedId, propertyId, roomId);
        if (!bed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found`);
        }
        return bed;
    }
    async getBedsByRoom(roomId, propertyId) {
        // Ensure Room exists
        await this.roomService.getById({ roomId, propertyId });
        const beds = await this.bedRepository.findByRoomId(roomId, propertyId);
        if (beds.length === 0)
            return [];
        return beds;
    }
    async update({ bedId, propertyId, roomId, updateData }) {
        await this.getById(bedId, propertyId, roomId);
        const updatedBed = await this.bedRepository.update({ bedId, roomId, propertyId, updateData });
        if (!updatedBed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for update`);
        }
        RequestLogger.info(`Bed updated: ${bedId}`);
        return updatedBed;
    }
    async delete(bedId, propertyId, roomId) {
        await this.getById(bedId, propertyId, roomId);
        const deleted = await this.bedRepository.delete(bedId, propertyId, roomId);
        if (!deleted) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for deletion`);
        }
        RequestLogger.info(`Bed deleted: ${bedId}`);
        return { success: true };
    }
}
//# sourceMappingURL=bed.service.js.map