import { generateId, ID_PREFIXES } from "../utils/common.js";
export class GuestRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("guests");
    }
    async create(guestData) {
        const guestId = generateId(ID_PREFIXES.guest);
        const newGuest = {
            guestId,
            ...guestData,
        };
        await this.collection.insertOne(newGuest, { session: this.session });
        return newGuest;
    }
    async getGuestById(guestId) {
        return await this.collection.findOne({ guestId }, { session: this.session });
    }
    async getGuestByUserId(userId) {
        return await this.collection.findOne({ userId }, { session: this.session });
    }
    async updateGuest(guestId, updateData) {
        await this.collection.updateOne({ guestId }, { $set: updateData }, { session: this.session });
        return await this.getGuestById(guestId);
    }
    async deleteGuest(guestId) {
        const result = await this.collection.deleteOne({ guestId }, { session: this.session });
        return result.deletedCount > 0;
    }
    async getGuestsByIds(guestIds) {
        return await this.collection.find({ guestId: { $in: guestIds } }, { session: this.session }).toArray();
    }
}
//# sourceMappingURL=guest.repository.js.map