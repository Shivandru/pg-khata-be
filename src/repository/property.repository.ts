import type { Collection, Db } from "mongodb";
import type { z } from "zod";
import { propertySchema, type UpdateProperty } from "../schemas/property.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export type Property = z.infer<typeof propertySchema>;

export class PropertyRepository {
    constructor(
        private readonly db: Db
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
        await this.collection.insertOne(newProperty);
        return newProperty;
    }

    async findById(propertyId: string): Promise<Property | null> {
        return await this.collection.findOne({ propertyId });
    }

    async update(propertyId: string, updateData: UpdateProperty): Promise<Property | null> {
        await this.collection.updateOne({ propertyId }, { $set: updateData });
        return await this.findById(propertyId);
    }
}
