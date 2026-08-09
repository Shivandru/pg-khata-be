import { generateId, ID_PREFIXES } from "../utils/common.js";
export class OwnerRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("owners");
    }
    async create(ownerData) {
        const ownerId = generateId(ID_PREFIXES.owner);
        const newOwner = {
            ownerId,
            ...ownerData,
        };
        await this.collection.insertOne(newOwner, { session: this.session });
        return newOwner;
    }
    async getOwnerById(ownerId) {
        return await this.collection.findOne({ ownerId }, { session: this.session });
    }
    async getOwnerByUserId(userId) {
        return await this.collection.findOne({ userId }, { session: this.session });
    }
    async updateOwner(ownerId, updateData) {
        await this.collection.updateOne({ ownerId }, { $set: updateData }, { session: this.session });
        return await this.getOwnerById(ownerId);
    }
    async deleteOwner(ownerId) {
        const result = await this.collection.deleteOne({ ownerId }, { session: this.session });
        return result.deletedCount > 0;
    }
}
//# sourceMappingURL=owner.repository.js.map