import { bedSchema } from "../schemas/bed.js";
import { generateId, ID_PREFIXES } from "../utils/common.js";
export class BedRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("beds");
    }
    async create({ propertyId, roomId }) {
        const existingBeds = await this.findByRoomId(roomId, propertyId);
        const bedId = generateId(ID_PREFIXES.bed);
        const newBed = {
            bedId,
            propertyId,
            roomId,
            label: String.fromCharCode(65 + existingBeds.length), // A, B, C, D...
            isOccupied: false,
        };
        await this.collection.insertOne(newBed, {
            session: this.session,
        });
        return newBed;
    }
    async createMany(beds) {
        const newBeds = beds.map((bed) => {
            const bedId = generateId(ID_PREFIXES.bed);
            return {
                bedId,
                ...bed,
            };
        });
        await this.collection.insertMany(newBeds, { session: this.session });
        return newBeds.map((bed) => {
            return {
                bedId: bed.bedId,
                roomId: bed.roomId,
                propertyId: bed.propertyId,
                label: bed.label,
                isOccupied: bed.isOccupied,
            };
        });
    }
    async findById(bedId, propertyId, roomId) {
        return await this.collection.findOne({ propertyId, roomId, bedId }, { session: this.session });
    }
    async findByRoomId(roomId, propertyId) {
        return await this.collection
            .find({ propertyId, roomId }, { session: this.session })
            .toArray();
    }
    async countByRoomId({ roomId, propertyId }) {
        return await this.collection.countDocuments({ propertyId, roomId }, { session: this.session });
    }
    async update({ bedId, roomId, propertyId, updateData, }) {
        await this.collection.updateOne({ propertyId, roomId, bedId }, { $set: updateData }, { session: this.session });
        return await this.findById(bedId, propertyId, roomId);
    }
    async updateLabels(propertyId, roomId, beds) {
        for (const [index, bed] of beds.entries()) {
            await this.collection.updateOne({ propertyId, roomId, bedId: bed.bedId }, { $set: { label: String.fromCharCode(65 + index) } }, { session: this.session });
        }
    }
    async delete(bedId, propertyId, roomId) {
        const result = await this.collection.deleteOne({ propertyId, roomId, bedId }, { session: this.session });
        return result.deletedCount > 0;
    }
    async deleteMany(propertyId, roomId) {
        const result = await this.collection.deleteMany({ propertyId, roomId }, { session: this.session });
        return result.deletedCount;
    }
    async setOccupied(bedId, propertyId, roomId, isOccupied) {
        await this.collection.updateOne({ propertyId, roomId, bedId }, { $set: { isOccupied } }, { session: this.session });
    }
}
//# sourceMappingURL=bed.repository.js.map