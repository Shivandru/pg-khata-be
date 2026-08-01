
import RequestLogger from "../middlewares/RequestLogger.ts";
import { PropertyPricingRepository, type PropertyPricingById, type UpdatePricing } from "../repository/propertyPricing.repository.ts";
import type { CreatePropertyPricing } from "../schemas/propertyPricing.ts";
import { NotFoundException } from "../utils/exceptions/client.ts";


export class PropertyPricingService {

    constructor(
        private readonly propertyPricingRepository: PropertyPricingRepository
    ){}

    async create( propertyId: string, pricingList: CreatePropertyPricing) {
        const propertyPricing = await this.propertyPricingRepository.create( propertyId, pricingList);
        RequestLogger.info(`Property Pricing created: ${propertyPricing}`);
        return propertyPricing;
    }
    async getPropertyPricing(propertyId: string) {
        const propertyPricing = await this.propertyPricingRepository.findAllByPropertyId(propertyId);
        if (!propertyPricing) {
            throw new NotFoundException(`Pricing not found for property ${propertyId}`);
        }
        RequestLogger.info(`Property Pricing found: ${propertyId} - ${propertyPricing.length}`);
        return propertyPricing;
    }

    async update({ propertyPricingId, propertyId, updateData }: UpdatePricing) {
        const updatedPropertyPricing = await this.propertyPricingRepository.update({ propertyPricingId, propertyId, updateData });
        if (!updatedPropertyPricing) {
            throw new NotFoundException(`Property Pricing with ID ${propertyPricingId} not found for update`);
        }
        RequestLogger.info(`Property Pricing updated: ${propertyPricingId}`);
        return updatedPropertyPricing;
    }

    async delete({propertyPricingId, propertyId }: PropertyPricingById) {
        const deleted = await this.propertyPricingRepository.delete({ propertyPricingId, propertyId });
        if (!deleted) {
            throw new NotFoundException(`Property Pricing with ID ${propertyPricingId} not found for deletion`);
        }
        RequestLogger.info(`Property Pricing deleted: ${propertyPricingId}`);
        return { success: true };
    }
}