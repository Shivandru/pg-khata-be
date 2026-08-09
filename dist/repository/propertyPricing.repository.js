import {} from "../schemas/propertyPricing.js";
import { generateId, ID_PREFIXES } from "../utils/common.js";
export class PropertyPricingRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("propertyPricings");
    }
    async create(propertyId, pricingList) {
        const propertyPricings = pricingList.map((pricing) => ({
            propertyPricingId: generateId(ID_PREFIXES.propertyPricing),
            propertyId,
            bedCount: pricing.bedCount,
            rentAmount: pricing.rentAmount,
        }));
        await this.collection.insertMany(propertyPricings, {
            session: this.session,
        });
        return propertyPricings;
    }
    async findAllByPropertyId(propertyId) {
        return await this.collection
            .find({ propertyId }, { session: this.session })
            .sort({ bedCount: 1 })
            .toArray();
    }
    async findByPropertyAndBedCount(propertyId, bedCount) {
        return await this.collection.findOne({
            propertyId,
            bedCount,
        }, { session: this.session });
    }
    async getPropertyPricing(propertyId, propertyPricingId) {
        return await this.collection.findOne({ propertyId, propertyPricingId }, { session: this.session });
    }
    async update({ propertyPricingId, propertyId, updateData, }) {
        await this.collection.updateOne({ propertyId, propertyPricingId }, { $set: updateData }, { session: this.session });
        return await this.getPropertyPricing(propertyId, propertyPricingId);
    }
    async delete({ propertyPricingId, propertyId, }) {
        const result = await this.collection.deleteOne({
            propertyId,
            propertyPricingId,
        }, { session: this.session });
        return result.deletedCount > 0;
    }
}
//# sourceMappingURL=propertyPricing.repository.js.map