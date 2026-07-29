import type { Collection, Db } from "mongodb";
import {
  type CreatePropertyPricing,
  type PropertyPricing,
  type UpdatePropertyPricing,
} from "../schemas/propertyPricing.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export default class PropertyPricingRepository {
  constructor(private readonly db: Db) {}

  get collection(): Collection<PropertyPricing> {
    return this.db.collection("propertyPricings");
  }

  async create(
    propertyPricingData: CreatePropertyPricing,
  ): Promise<PropertyPricing> {
    const propertyPricingId = generateId(ID_PREFIXES.propertyPricing);
    const propertyPricing = { propertyPricingId, ...propertyPricingData };
    await this.collection.insertOne(propertyPricing);
    return propertyPricing;
  }

  async findAllByPropertyId(
    propertyId: string,
  ): Promise<PropertyPricing[] | null> {
    return await this.collection
      .find({ propertyId })
      .sort({ bedCount: 1 })
      .toArray();
  }

  async findByPropertyAndBedCount(
    propertyId: string,
    bedCount: number,
  ): Promise<PropertyPricing | null> {
    return await this.collection.findOne({
      propertyId,
      bedCount,
    });
  }

  async getPropertyPricing(
    propertyId: string,
    propertyPricingId: string,
  ): Promise<PropertyPricing | null> {
    return await this.collection.findOne({ propertyId, propertyPricingId });
  }

  async update(
    propertyPricingId: string,
    propertyId: string,
    updateData: UpdatePropertyPricing,
  ): Promise<PropertyPricing | null> {
    await this.collection.updateOne(
      { propertyId, propertyPricingId },
      { $set: updateData },
    );
    return await this.getPropertyPricing(propertyId, propertyPricingId);
  }

  async delete(
    propertyPricingId: string,
    propertyId: string,
  ): Promise<boolean> {
    const result = await this.collection.deleteOne({
      propertyId,
      propertyPricingId,
    });
    return result.deletedCount > 0;
  }
}
