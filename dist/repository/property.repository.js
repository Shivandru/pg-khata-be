import { propertySchema } from "../schemas/property.js";
import { generateId, ID_PREFIXES } from "../utils/common.js";
export class PropertyRepository {
    db;
    session;
    constructor(db, session) {
        this.db = db;
        this.session = session;
    }
    get collection() {
        return this.db.collection("properties");
    }
    async create(propertyData) {
        const propertyId = generateId(ID_PREFIXES.property);
        const newProperty = {
            propertyId,
            ...propertyData,
        };
        await this.collection.insertOne(newProperty, { session: this.session });
        return newProperty;
    }
    async findById(propertyId) {
        return await this.collection.findOne({ propertyId }, { session: this.session });
    }
    async update(propertyId, updateData) {
        await this.collection.updateOne({ propertyId }, { $set: updateData }, { session: this.session });
        return await this.findById(propertyId);
    }
    async findAll() {
        return await this.collection.find({}, { session: this.session }).toArray();
    }
    async findByOwnerId(ownerId) {
        return await this.collection.findOne({ ownerId }, { session: this.session });
    }
}
//# sourceMappingURL=property.repository.js.map