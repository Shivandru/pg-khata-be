import type { Collection } from "mongodb";
import MongoConnection from "../config/db.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";
import { propertySchema } from "../schemas/property.ts";
import type { z } from "zod";

export type Property = z.infer<typeof propertySchema>;

export class PropertyRepository {
    private getCollection(): Collection<Property> {
        return MongoConnection.getInstance().getDb().collection<Property>("properties");
    }

    async create(propertyData: Omit<Property, "propertyId">): Promise<Property> {
        const propertyId = generateId(ID_PREFIXES.property);
        const newProperty: Property = {
            propertyId,
            ...propertyData,
        };
        await this.getCollection().insertOne(newProperty);
        return newProperty;
    }

    async findById(propertyId: string): Promise<Property | null> {
        return await this.getCollection().findOne({ propertyId });
    }

    async update(propertyId: string, updateData: Partial<Omit<Property, "propertyId" | "ownerId">>): Promise<Property | null> {
        await this.getCollection().updateOne({ propertyId }, { $set: updateData });
        return await this.findById(propertyId);
    }
}
