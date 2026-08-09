import { generateId, ID_PREFIXES } from "../utils/common.js";
export class TenancyRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("tenancies");
    }
    async create(tenancyData) {
        const tenancyId = generateId(ID_PREFIXES.tenancy);
        const newTenancy = {
            tenancyId,
            endDate: null,
            isActive: true,
            ...tenancyData,
        };
        await this.collection.insertOne(newTenancy, { session: this.session });
        return newTenancy;
    }
    async getTenancyById(tenancyId) {
        return await this.collection.findOne({ tenancyId }, { session: this.session });
    }
    async getActiveTenancyByGuestId(guestId) {
        return await this.collection.findOne({
            guestId,
            isActive: true,
        }, { session: this.session });
    }
    async updateTenancy(tenancyId, updateData) {
        await this.collection.updateOne({ tenancyId }, { $set: updateData }, { session: this.session });
        return await this.getTenancyById(tenancyId);
    }
    async vacate(tenancyId, endDate) {
        await this.collection.updateOne({ tenancyId }, {
            $set: {
                endDate,
                isActive: false,
            },
        }, { session: this.session });
        return await this.getTenancyById(tenancyId);
    }
    async deleteTenancy(tenancyId) {
        const result = await this.collection.deleteOne({ tenancyId }, { session: this.session });
        return result.deletedCount > 0;
    }
    async getActiveTenanciesByPropertyId(propertyId) {
        return await this.collection.find({ propertyId, isActive: true }, { session: this.session }).toArray();
    }
}
//# sourceMappingURL=tenancy.repository.js.map