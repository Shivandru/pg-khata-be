import type { Request, Response } from "express";
import type { RoomSetupService } from "../services/roomSetup.service.ts";
export declare class RoomSetupController {
    private readonly roomSetupService;
    constructor(roomSetupService: RoomSetupService);
    setup: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=roomSetup.controller.d.ts.map