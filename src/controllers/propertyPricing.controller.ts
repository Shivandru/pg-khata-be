import type { Request, Response } from "express";
import { PropertyPricingService } from "../services/propertyPricing.service.ts";
import { UnauthorizedException } from "../utils/exceptions/client.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { PropertyPricingById } from "../repository/propertyPricing.repository.ts";
import type { UpdatePropertyPricing } from "../schemas/propertyPricing.ts";

export class PropertyPricingController {
    constructor(private readonly propertyPricingService: PropertyPricingService) {}

    create = async (req: Request, res: Response) => {
        if (!req.user) {
            throw new UnauthorizedException("User not authenticated");
        }
        const { propertyId } = req.params as {propertyId: string};
        const propertyPricing = await this.propertyPricingService.create(propertyId, req.body );
        res.status(HttpStatusCodes.Success.CREATED).json(propertyPricing);
    }

    getPropertyPricing = async (req: Request, res: Response) => {
        const { propertyId } = req.params as { propertyId: string };
        const propertyPricing = await this.propertyPricingService.getPropertyPricing(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(propertyPricing);
    }

    update = async (req: Request, res: Response) => {
        const { propertyPricingId, propertyId } = req.params as PropertyPricingById;
        const updateData = req.body as UpdatePropertyPricing;
        const propertyPricing = await this.propertyPricingService.update({ propertyPricingId, propertyId, updateData });
        res.status(HttpStatusCodes.Success.OK).json(propertyPricing);
    }

    delete = async (req: Request, res: Response) => {
        const { propertyPricingId, propertyId } = req.params as PropertyPricingById;
        const result = await this.propertyPricingService.delete({ propertyPricingId, propertyId });
        res.status(HttpStatusCodes.Success.OK).json(result);
    }
}