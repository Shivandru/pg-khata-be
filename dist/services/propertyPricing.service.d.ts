import { PropertyPricingRepository, type PropertyPricingById, type UpdatePricing } from "../repository/propertyPricing.repository.ts";
import type { CreatePropertyPricing } from "../schemas/propertyPricing.ts";
export declare class PropertyPricingService {
    private readonly propertyPricingRepository;
    constructor(propertyPricingRepository: PropertyPricingRepository);
    create(propertyId: string, pricingList: CreatePropertyPricing): Promise<{
        propertyPricingId: string;
        propertyId: string;
        bedCount: number;
        rentAmount: number;
    }[]>;
    getPropertyPricing(propertyId: string): Promise<{
        propertyPricingId: string;
        propertyId: string;
        bedCount: number;
        rentAmount: number;
    }[]>;
    update({ propertyPricingId, propertyId, updateData }: UpdatePricing): Promise<{
        propertyPricingId: string;
        propertyId: string;
        bedCount: number;
        rentAmount: number;
    }>;
    delete({ propertyPricingId, propertyId }: PropertyPricingById): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=propertyPricing.service.d.ts.map