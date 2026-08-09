import type { Request, Response } from "express";
import type { BedSetupService } from "../services/bedSetup.service.ts";
export declare class BedSetupController {
    private readonly bedSetupService;
    constructor(bedSetupService: BedSetupService);
    setup: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=bedSetup.controller.d.ts.map