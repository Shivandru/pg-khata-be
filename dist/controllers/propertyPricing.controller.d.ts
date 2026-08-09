import type { Request, Response } from "express";
import { PropertyPricingService } from "../services/propertyPricing.service.ts";
export declare class PropertyPricingController {
    private readonly propertyPricingService;
    constructor(propertyPricingService: PropertyPricingService);
    create: (req: Request, res: Response) => Promise<void>;
    getPropertyPricing: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=propertyPricing.controller.d.ts.map