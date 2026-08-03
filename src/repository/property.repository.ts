import type { Collection, Db, ClientSession } from "mongodb";
import type { z } from "zod";
import { propertySchema, type UpdateProperty } from "../schemas/property.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export type Property = z.infer<typeof propertySchema>;

export class PropertyRepository {
    constructor(
        private readonly db: Db,
        private readonly session?: ClientSession
    ){}

    private get collection(): Collection<Property> {
        return this.db.collection<Property>("properties");
    }

    async create(propertyData: Omit<Property, "propertyId">): Promise<Property> {
        const propertyId = generateId(ID_PREFIXES.property);
        const newProperty: Property = {
            propertyId,
            ...propertyData,
        };
        await this.collection.insertOne(newProperty, { session: this.session });
        return newProperty;
    }

    async findById(propertyId: string): Promise<Property | null> {
        return await this.collection.findOne({ propertyId }, { session: this.session });
    }

    async update(propertyId: string, updateData: UpdateProperty): Promise<Property | null> {
        await this.collection.updateOne({ propertyId }, { $set: updateData }, { session: this.session });
        return await this.findById(propertyId);
    }
}
