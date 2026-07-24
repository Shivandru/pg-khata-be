import { BedRepository } from "../repository/bed.repository.ts";
import { RoomService } from "./room.service.ts";
import { NotFoundException, ConflictException } from "../utils/exceptions/client.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import MongoConnection from "../config/db.ts";

export class BedService {
    private bedRepository: BedRepository;
    private roomService: RoomService;

    constructor() {
        this.bedRepository = new BedRepository();
        this.roomService = new RoomService();
    }

    async create(roomId: string, label: string, rentAmount: number) {
        // Ensure Room exists
        await this.roomService.getById(roomId);

        const bed = await this.bedRepository.create({ roomId, label, rentAmount });
        RequestLogger.info(`Bed created: Bed ${bed.label} in Room ${bed.roomId} (${bed.bedId})`);
        return bed;
    }

    async getById(bedId: string) {
        const bed = await this.bedRepository.findById(bedId);
        if (!bed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found`);
        }
        return bed;
    }

    async getBedsByRoom(roomId: string) {
        // Ensure Room exists
        await this.roomService.getById(roomId);

        const beds = await this.bedRepository.findByRoomId(roomId);
        if (beds.length === 0) return [];

        const db = MongoConnection.getInstance().getDb();
        const bedIds = beds.map(b => b.bedId);

        // Get all active tenancies for these beds
        const activeTenancies = await db.collection("tenancies").find({
            bedId: { $in: bedIds },
            isActive: true
        }).toArray();

        const activeBedIds = new Set(activeTenancies.map(t => t.bedId));

        return beds.map(bed => ({
            bedId: bed.bedId,
            roomId: bed.roomId,
            label: bed.label,
            rentAmount: bed.rentAmount,
            isOccupied: activeBedIds.has(bed.bedId)
        }));
    }

    async update(bedId: string, updateData: { label?: string; rentAmount?: number }) {
        await this.getById(bedId);
        const updatedBed = await this.bedRepository.update(bedId, updateData);
        if (!updatedBed) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for update`);
        }
        RequestLogger.info(`Bed updated: ${bedId}`);
        return updatedBed;
    }

    async delete(bedId: string) {
        await this.getById(bedId);

        const db = MongoConnection.getInstance().getDb();
        const activeTenancy = await db.collection("tenancies").findOne({
            bedId,
            isActive: true
        });

        if (activeTenancy) {
            throw new ConflictException(`Cannot delete bed with ID ${bedId} because it has an active tenancy`);
        }

        const deleted = await this.bedRepository.delete(bedId);
        if (!deleted) {
            throw new NotFoundException(`Bed with ID ${bedId} not found for deletion`);
        }
        RequestLogger.info(`Bed deleted: ${bedId}`);
        return { success: true };
    }
}
