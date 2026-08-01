import type { Collection, Db } from "mongodb";
import {
  type CreatePropertyPricing,
  type PropertyPricing,
  type UpdatePropertyPricing,
} from "../schemas/propertyPricing.ts";
import { generateId, ID_PREFIXES } from "../utils/common.ts";

export type UpdatePricing = {
  propertyId: string;
  propertyPricingId: string;
  updateData: UpdatePropertyPricing
};

export type PropertyPricingById = {
  propertyPricingId: string;
  propertyId: string;
};

export class PropertyPricingRepository {
  constructor(private readonly db: Db) {}

  get collection(): Collection<PropertyPricing> {
    return this.db.collection("propertyPricings");
  }

  async create(
    propertyId: string,
    pricingList: CreatePropertyPricing,
): Promise<PropertyPricing[]> {
    const propertyPricings: PropertyPricing[] = pricingList.map((pricing) => ({
        propertyPricingId: generateId(ID_PREFIXES.propertyPricing),
        propertyId,
        bedCount: pricing.bedCount,
        rentAmount: pricing.rentAmount,
    }));

    await this.collection.insertMany(propertyPricings);

    return propertyPricings;
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

  async update({
    propertyPricingId,
    propertyId,
    updateData,
  }: UpdatePricing): Promise<PropertyPricing | null> {
    await this.collection.updateOne(
      { propertyId, propertyPricingId },
      { $set: updateData },
    );
    return await this.getPropertyPricing(propertyId, propertyPricingId);
  }

  async delete({
    propertyPricingId,
    propertyId,
  }: PropertyPricingById): Promise<boolean> {
    const result = await this.collection.deleteOne({
      propertyId,
      propertyPricingId,
    });
    return result.deletedCount > 0;
  }
}
