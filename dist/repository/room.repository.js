import { roomSchema } from "../schemas/room.js";
import { generateId, ID_PREFIXES } from "../utils/common.js";
export class RoomRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("rooms");
    }
    async create(roomData) {
        const roomId = generateId(ID_PREFIXES.room);
        const newRoom = {
            roomId,
            ...roomData,
        };
        await this.collection.insertOne(newRoom, { session: this.session });
        return newRoom;
    }
    async findById({ roomId, propertyId }) {
        return await this.collection.findOne({ propertyId, roomId }, { session: this.session });
    }
    async findByPropertyId(propertyId) {
        return await this.collection
            .find({ propertyId }, { session: this.session })
            .toArray();
    }
    async update({ roomId, propertyId, updateData, }) {
        await this.collection.updateOne({ propertyId, roomId }, { $set: updateData }, { session: this.session });
        return await this.findById({ roomId, propertyId });
    }
    async delete({ roomId, propertyId }) {
        const result = await this.collection.deleteOne({ propertyId, roomId }, { session: this.session });
        return result.deletedCount > 0;
    }
    async incrementOccupiedCount(propertyId, roomId, delta) {
        await this.collection.updateOne({ propertyId, roomId }, { $inc: { occupiedCount: delta } }, { session: this.session });
    }
    async updateBedCount(propertyId, roomId, bedCount) {
        await this.collection.updateOne({ propertyId, roomId }, { $set: { bedCount } }, { session: this.session });
    }
}
//# sourceMappingURL=room.repository.js.map