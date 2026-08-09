import type { Request, Response } from "express";
import type { PropertySetupService } from "../services/propertySetup.service.ts";
export declare class PropertySetupController {
    private readonly propertySetupService;
    constructor(propertySetupService: PropertySetupService);
    setup: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=propertySetup.controller.d.ts.map