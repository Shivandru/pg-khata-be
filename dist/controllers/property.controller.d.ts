import type { Request, Response } from "express";
import { PropertyService } from "../services/property.service.ts";
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    getAll: (_req: Request, res: Response) => Promise<void>;
    getByOwner: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=property.controller.d.ts.map