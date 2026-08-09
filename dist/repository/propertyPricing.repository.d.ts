import type { Collection, Db, ClientSession } from "mongodb";
import { type CreatePropertyPricing, type PropertyPricing, type UpdatePropertyPricing } from "../schemas/propertyPricing.ts";
export type UpdatePricing = {
    propertyId: string;
    propertyPricingId: string;
    updateData: UpdatePropertyPricing;
};
export type PropertyPricingById = {
    propertyPricingId: string;
    propertyId: string;
};
export declare class PropertyPricingRepository {
    private readonly db;
    private readonly session?;
    constructor(db: Db, session?: ClientSession | undefined);
    get collection(): Collection<PropertyPricing>;
    create(propertyId: string, pricingList: CreatePropertyPricing): Promise<PropertyPricing[]>;
    findAllByPropertyId(propertyId: string): Promise<PropertyPricing[]>;
    findByPropertyAndBedCount(propertyId: string, bedCount: number): Promise<PropertyPricing | null>;
    getPropertyPricing(propertyId: string, propertyPricingId: string): Promise<PropertyPricing | null>;
    update({ propertyPricingId, propertyId, updateData, }: UpdatePricing): Promise<PropertyPricing | null>;
    delete({ propertyPricingId, propertyId, }: PropertyPricingById): Promise<boolean>;
}
//# sourceMappingURL=propertyPricing.repository.d.ts.map