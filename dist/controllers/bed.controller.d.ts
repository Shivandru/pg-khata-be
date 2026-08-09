import type { Request, Response } from "express";
import { BedService } from "../services/bed.service.ts";
export type BedById = {
    bedId: string;
    roomId: string;
    propertyId: string;
};
export declare class BedController {
    private readonly bedService;
    constructor(bedService: BedService);
    create: (req: Request, res: Response) => Promise<void>;
    getBedsByRoom: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=bed.controller.d.ts.map