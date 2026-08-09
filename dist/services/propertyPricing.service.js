import RequestLogger from "../middlewares/RequestLogger.js";
import { PropertyPricingRepository } from "../repository/propertyPricing.repository.js";
import { NotFoundException } from "../utils/exceptions/client.js";
export class PropertyPricingService {
    propertyPricingRepository;
    constructor(propertyPricingRepository) {
        this.propertyPricingRepository = propertyPricingRepository;
    }
    async create(propertyId, pricingList) {
        const propertyPricing = await this.propertyPricingRepository.create(propertyId, pricingList);
        RequestLogger.info(`Property Pricing created: ${propertyPricing}`);
        return propertyPricing;
    }
    async getPropertyPricing(propertyId) {
        const propertyPricing = await this.propertyPricingRepository.findAllByPropertyId(propertyId);
        if (!propertyPricing) {
            throw new NotFoundException(`Pricing not found for property ${propertyId}`);
        }
        RequestLogger.info(`Property Pricing found: ${propertyId} - ${propertyPricing.length}`);
        return propertyPricing;
    }
    async update({ propertyPricingId, propertyId, updateData }) {
        const updatedPropertyPricing = await this.propertyPricingRepository.update({ propertyPricingId, propertyId, updateData });
        if (!updatedPropertyPricing) {
            throw new NotFoundException(`Property Pricing with ID ${propertyPricingId} not found for update`);
        }
        RequestLogger.info(`Property Pricing updated: ${propertyPricingId}`);
        return updatedPropertyPricing;
    }
    async delete({ propertyPricingId, propertyId }) {
        const deleted = await this.propertyPricingRepository.delete({ propertyPricingId, propertyId });
        if (!deleted) {
            throw new NotFoundException(`Property Pricing with ID ${propertyPricingId} not found for deletion`);
        }
        RequestLogger.info(`Property Pricing deleted: ${propertyPricingId}`);
        return { success: true };
    }
}
//# sourceMappingURL=propertyPricing.service.js.map