import RequestLogger from "../middlewares/RequestLogger.ts";
import { BedRepository } from "../repository/bed.repository.ts";
import type { UpdateBed } from "../schemas/bed.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";
import { RoomService } from "./room.service.ts";

export class BedService {

    constructor(
        private readonly bedRepository: BedRepository,
        private readonly roomService: RoomService
    ) {}

    async create(roomId: string, propertyId: string) {
        // Ensure Room exists
        await this.roomService.getById({roomId, propertyId});

        const bed = await this.bedRepository.create({ roomId, propertyId });

        RequestLogger.info(`Bed created: Bed ${bed.label} in Room ${bed.roomId} (${bed.bedId})`);
        return bed;
    }

    async getById(bedId: string, propertyId: string, roomId: string) {
        const bed = await this.bedRepository.findById(bedId, propertyId, roomId);
        if (!bed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found`);
        }
        return bed;
    }

    async getBedsByRoom(roomId: string, propertyId: string) {
        // Ensure Room exists
        await this.roomService.getById({ roomId, propertyId });

        const beds = await this.bedRepository.findByRoomId(roomId, propertyId);
        if (beds.length === 0) return [];

        return beds;
    }

    async update({bedId, propertyId, roomId, updateData}: {bedId: string, propertyId: string, roomId: string, updateData: UpdateBed}) {
        await this.getById(bedId, propertyId, roomId);
        const updatedBed = await this.bedRepository.update({bedId, roomId, propertyId, updateData});
        if (!updatedBed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for update`);
        }
        RequestLogger.info(`Bed updated: ${bedId}`);
        return updatedBed;
    }

    async delete(bedId: string, propertyId: string, roomId: string) {
        await this.getById(bedId, propertyId, roomId);

        const deleted = await this.bedRepository.delete(bedId, propertyId, roomId);
        if (!deleted) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for deletion`);
        }
        RequestLogger.info(`Bed deleted: ${bedId}`);
        return { success: true };
    }
}
