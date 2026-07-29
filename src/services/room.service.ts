import { RoomRepository } from "../repository/room.repository.ts";
import { BedRepository } from "../repository/bed.repository.ts";
import { PropertyService } from "./property.service.ts";
import { NotFoundException, ConflictException } from "../utils/exceptions/client.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import MongoConnection from "../config/db.ts";
import type { UpdateRoom } from "../schemas/room.ts";

export class RoomService {

    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly bedRepository: BedRepository,
        private readonly propertyService: PropertyService
    ) {}

    async create(propertyId: string, roomNumber: string, floor: number, bedCount: number, occupiedCount: number) {
        // Check if property exists
        await this.propertyService.getById(propertyId);

        const room = await this.roomRepository.create({ propertyId, roomNumber, floor, bedCount, occupiedCount });
        RequestLogger.info(`Room created: Room ${room.roomNumber} on Floor ${room.floor} (${room.roomId})`);
        return room;
    }

    async getById(roomId: string, propertyId: string) {
        const room = await this.roomRepository.findById(roomId, propertyId);
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found`);
        }
        return room;
    }

    async getRoomsByProperty(propertyId: string) {
        // Ensure property exists
        await this.propertyService.getById(propertyId);

        const rooms = await this.roomRepository.findByPropertyId(propertyId);
        if (rooms.length === 0) return [];

        const db = MongoConnection.getInstance().getDb();
        
        // Get all beds in these rooms
        const roomIds = rooms.map(r => r.roomId);
        const beds = await db.collection("beds").find({ roomId: { $in: roomIds } }).toArray();

        // Get active tenancies for these beds
        const bedIds = beds.map(b => b.bedId);
        const activeTenancies = await db.collection("tenancies").find({
            bedId: { $in: bedIds },
            isActive: true
        }).toArray();

        const activeBedIds = new Set(activeTenancies.map(t => t.bedId));

        return rooms.map(room => {
            const roomBeds = beds.filter(b => b.roomId === room.roomId);
            const bedCount = roomBeds.length;
            const occupiedCount = roomBeds.filter(b => activeBedIds.has(b.bedId)).length;
            return {
                roomId: room.roomId,
                propertyId: room.propertyId,
                roomNumber: room.roomNumber,
                floor: room.floor,
                bedCount,
                occupiedCount
            };
        });
    }

    async update(roomId: string, propertyId: string, updateData: UpdateRoom) {
        await this.getById(roomId, propertyId);
        const updatedRoom = await this.roomRepository.update(roomId, propertyId, updateData);
        if (!updatedRoom) {
            throw new NotFoundException(`Room with ID ${roomId} not found for update`);
        }
        RequestLogger.info(`Room updated: ${roomId}`);
        return updatedRoom;
    }

    async delete(roomId: string, propertyId: string) {
        await this.getById(roomId, propertyId);
        
        // Check if there are beds in the room
        const bedCount = await this.bedRepository.countByRoomId(roomId, propertyId);
        if (bedCount > 0) {
            throw new ConflictException(`Cannot delete room with ID ${roomId} because it contains beds`);
        }

        const deleted = await this.roomRepository.delete(roomId);
        if (!deleted) {
            throw new NotFoundException(`Room with ID ${roomId} not found for deletion`);
        }
        RequestLogger.info(`Room deleted: ${roomId}`);
        return { success: true };
    }
}
