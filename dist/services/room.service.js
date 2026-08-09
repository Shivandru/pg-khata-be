import { RoomRepository } from "../repository/room.repository.js";
import { BedRepository } from "../repository/bed.repository.js";
import { PropertyService } from "./property.service.js";
import { NotFoundException, ConflictException } from "../utils/exceptions/client.js";
import RequestLogger from "../middlewares/RequestLogger.js";
import MongoConnection from "../config/db.js";
export class RoomService {
    roomRepository;
    bedRepository;
    propertyService;
    constructor(roomRepository, bedRepository, propertyService) {
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.propertyService = propertyService;
    }
    async create({ propertyId, roomNumber, floor, bedCount, occupiedCount }) {
        // Check if property exists
        await this.propertyService.getById(propertyId);
        const room = await this.roomRepository.create({ propertyId, roomNumber, floor, bedCount, occupiedCount });
        RequestLogger.info(`Room created: Room ${room.roomNumber} on Floor ${room.floor} (${room.roomId})`);
        return room;
    }
    async getById({ propertyId, roomId }) {
        const room = await this.roomRepository.findById({ propertyId, roomId });
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found`);
        }
        return room;
    }
    async getRoomsByProperty(propertyId) {
        // Ensure property exists
        await this.propertyService.getById(propertyId);
        const rooms = await this.roomRepository.findByPropertyId(propertyId);
        if (rooms.length === 0)
            return [];
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
    async update({ roomId, propertyId, updateData }) {
        await this.getById({ propertyId, roomId });
        const updatedRoom = await this.roomRepository.update({ roomId, propertyId, updateData });
        if (!updatedRoom) {
            throw new NotFoundException(`Room with ID ${roomId} not found for update`);
        }
        RequestLogger.info(`Room updated: ${roomId}`);
        return updatedRoom;
    }
    async delete({ roomId, propertyId }) {
        await this.getById({ propertyId, roomId });
        // Check if there are beds in the room
        const bedCount = await this.bedRepository.countByRoomId({ roomId, propertyId });
        if (bedCount > 0) {
            throw new ConflictException(`Cannot delete room with ID ${roomId} because it contains beds`);
        }
        const deleted = await this.roomRepository.delete({ propertyId, roomId });
        if (!deleted) {
            throw new NotFoundException(`Room with ID ${roomId} not found for deletion`);
        }
        RequestLogger.info(`Room deleted: ${roomId}`);
        return { success: true };
    }
}
//# sourceMappingURL=room.service.js.map