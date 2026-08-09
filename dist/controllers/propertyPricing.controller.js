import { PropertyPricingService } from "../services/propertyPricing.service.js";
import { UnauthorizedException } from "../utils/exceptions/client.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class PropertyPricingController {
    propertyPricingService;
    constructor(propertyPricingService) {
        this.propertyPricingService = propertyPricingService;
    }
    create = async (req, res) => {
        if (!req.user) {
            throw new UnauthorizedException("User not authenticated");
        }
        const { propertyId } = req.params;
        const propertyPricing = await this.propertyPricingService.create(propertyId, req.body);
        res.status(HttpStatusCodes.Success.CREATED).json(propertyPricing);
    };
    getPropertyPricing = async (req, res) => {
        const { propertyId } = req.params;
        const propertyPricing = await this.propertyPricingService.getPropertyPricing(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(propertyPricing);
    };
    update = async (req, res) => {
        const { propertyPricingId, propertyId } = req.params;
        const updateData = req.body;
        const propertyPricing = await this.propertyPricingService.update({ propertyPricingId, propertyId, updateData });
        res.status(HttpStatusCodes.Success.OK).json(propertyPricing);
    };
    delete = async (req, res) => {
        const { propertyPricingId, propertyId } = req.params;
        const result = await this.propertyPricingService.delete({ propertyPricingId, propertyId });
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
//# sourceMappingURL=propertyPricing.controller.js.map