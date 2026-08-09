import type { Request, Response } from "express";
import { OwnerService } from "../services/owner.service.ts";
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    create: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    getMe: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=owner.controller.d.ts.map